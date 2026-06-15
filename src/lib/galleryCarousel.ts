import {
  readGallerySlidesFromVolume,
  galleryVolumeRoot,
} from "@/lib/galleryVolume";
import { getCloudinaryGallerySlides } from "@/lib/cloudinaryGallery";

export type GallerySlide = {
  src: string;
  alt: string;
};

type GalleryManifest = {
  slides?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseSlides(raw: unknown): GallerySlide[] {
  if (!raw || typeof raw !== "object") return [];

  const slides = (raw as GalleryManifest).slides;
  if (!Array.isArray(slides)) return [];

  return slides
    .map((item): GallerySlide | null => {
      if (!item || typeof item !== "object") return null;
      const src = (item as GallerySlide).src;
      const alt = (item as GallerySlide).alt;
      if (!isNonEmptyString(src)) return null;
      return {
        src: src.trim(),
        alt: isNonEmptyString(alt) ? alt.trim() : "FunFactory gallery",
      };
    })
    .filter((slide): slide is GallerySlide => slide !== null);
}

/**
 * Loads carousel slides from external storage (no binaries in the repo).
 *
 * Option A — Cloudinary folder (recommended):
 *   CLOUDINARY_CLOUD_NAME=dfr4aej2h
 *   CLOUDINARY_API_KEY=...
 *   CLOUDINARY_API_SECRET=...
 *   CLOUDINARY_GALLERY_FOLDER=FunFactory Gallery   (optional, this is the default)
 *
 * Option B — Railway Volume:
 *   1. Attach a Volume in Railway, mount at e.g. /data/gallery
 *   2. Set GALLERY_VOLUME_PATH=/data/gallery
 *   3. Upload images (+ optional manifest.json) into that folder
 *   Images are served at /gallery/<filename>
 *
 * Option C — hosted manifest URL (any HTTPS host):
 *   GALLERY_CAROUSEL_MANIFEST_URL=https://your-app.up.railway.app/gallery/manifest.json
 *
 * Option D — inline JSON env var:
 *   GALLERY_CAROUSEL_JSON={"slides":[{"src":"/gallery/a.jpg","alt":"..."}]}
 */
export async function getGalleryCarouselSlides(): Promise<GallerySlide[]> {
  const cloudinarySlides = await getCloudinaryGallerySlides();
  if (cloudinarySlides.length > 0) return cloudinarySlides;

  if (galleryVolumeRoot()) {
    const volumeSlides = await readGallerySlidesFromVolume();
    if (volumeSlides.length > 0) return volumeSlides;
  }

  const manifestUrl = process.env.GALLERY_CAROUSEL_MANIFEST_URL?.trim();
  if (manifestUrl) {
    try {
      const res = await fetch(manifestUrl, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const data: unknown = await res.json();
        const slides = parseSlides(data);
        if (slides.length > 0) return slides;
      }
    } catch {
      /* fall through to inline JSON */
    }
  }

  const inline = process.env.GALLERY_CAROUSEL_JSON?.trim();
  if (inline) {
    try {
      const data: unknown = JSON.parse(inline);
      return parseSlides(data);
    } catch {
      return [];
    }
  }

  return [];
}
