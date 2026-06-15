import { readdir, readFile } from "fs/promises";
import path from "path";
import type { GallerySlide } from "@/lib/galleryCarousel";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

/** Persistent gallery directory (Railway Volume mount path). */
export function galleryVolumeRoot(): string | null {
  const configured = process.env.GALLERY_VOLUME_PATH?.trim();
  if (!configured) return null;
  return path.resolve(configured);
}

/** Public URL for a file stored on the gallery volume. */
export function galleryPublicUrl(filename: string): string {
  const encoded = filename
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `/gallery/${encoded}`;
}

function resolveSafeVolumePath(root: string, relativePath: string): string | null {
  const normalized = path.normalize(relativePath).replace(/^(\.\.(\/|\\|$))+/, "");
  if (normalized.startsWith("..") || path.isAbsolute(normalized)) return null;

  const absolute = path.resolve(root, normalized);
  const relative = path.relative(root, absolute);
  if (relative.startsWith("..") || path.isAbsolute(relative)) return null;

  return absolute;
}

function humanizeFilename(filename: string): string {
  const stem = path.basename(filename, path.extname(filename));
  return stem.replace(/[-_]+/g, " ").trim() || "FunFactory gallery";
}

function parseManifestJson(raw: unknown): GallerySlide[] {
  if (!raw || typeof raw !== "object") return [];
  const slides = (raw as { slides?: unknown }).slides;
  if (!Array.isArray(slides)) return [];

  return slides
    .map((item): GallerySlide | null => {
      if (!item || typeof item !== "object") return null;
      const src = (item as GallerySlide).src;
      const alt = (item as GallerySlide).alt;
      if (typeof src !== "string" || !src.trim()) return null;
      return {
        src: src.trim(),
        alt:
          typeof alt === "string" && alt.trim()
            ? alt.trim()
            : "FunFactory gallery",
      };
    })
    .filter((slide): slide is GallerySlide => slide !== null);
}

async function discoverSlidesFromVolume(root: string): Promise<GallerySlide[]> {
  let entries: string[];
  try {
    entries = await readdir(root);
  } catch {
    return [];
  }

  return entries
    .filter((name) => IMAGE_EXT.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => ({
      src: galleryPublicUrl(name),
      alt: humanizeFilename(name),
    }));
}

/** Read manifest.json from the volume, or auto-list image files. */
export async function readGallerySlidesFromVolume(): Promise<GallerySlide[]> {
  const root = galleryVolumeRoot();
  if (!root) return [];

  const manifestPath = resolveSafeVolumePath(root, "manifest.json");
  if (manifestPath) {
    try {
      const raw = await readFile(manifestPath, "utf8");
      const slides = parseManifestJson(JSON.parse(raw) as unknown);
      if (slides.length > 0) return slides;
    } catch {
      /* fall through to directory scan */
    }
  }

  return discoverSlidesFromVolume(root);
}

export async function readGalleryVolumeFile(
  relativePath: string,
): Promise<{ data: Buffer; ext: string } | null> {
  const root = galleryVolumeRoot();
  if (!root) return null;

  const absolute = resolveSafeVolumePath(root, relativePath);
  if (!absolute) return null;

  try {
    const data = await readFile(absolute);
    const ext = path.extname(absolute).toLowerCase();
    return { data, ext };
  } catch {
    return null;
  }
}

export async function readGalleryManifestFile(): Promise<Buffer | null> {
  const result = await readGalleryVolumeFile("manifest.json");
  return result?.data ?? null;
}
