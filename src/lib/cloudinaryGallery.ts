import { unstable_cache } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import type { GallerySlide } from "@/lib/galleryCarousel";

type CloudinaryResource = {
  public_id: string;
  resource_type?: string;
  context?: { custom?: Record<string, string> };
};

const DEFAULT_GALLERY_FOLDER = "FunFactory Gallery";

function cloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim(),
  );
}

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!.trim(),
    api_key: process.env.CLOUDINARY_API_KEY!.trim(),
    api_secret: process.env.CLOUDINARY_API_SECRET!.trim(),
    secure: true,
  });
}

function galleryFolderName(): string {
  return (
    process.env.CLOUDINARY_GALLERY_FOLDER?.trim() || DEFAULT_GALLERY_FOLDER
  );
}

function humanizePublicId(publicId: string, folder: string): string {
  const prefix = folder.endsWith("/") ? folder : `${folder}/`;
  const name = publicId.startsWith(prefix)
    ? publicId.slice(prefix.length)
    : publicId.split("/").pop() ?? publicId;
  const stem = name.replace(/\.[^.]+$/, "");
  return stem.replace(/[-_]+/g, " ").trim() || "FunFactory gallery";
}

function galleryMaxWidth(): number {
  const raw = process.env.CLOUDINARY_GALLERY_MAX_WIDTH?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : 1400;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1400;
}

/** Web delivery URL — NOT the full-size original stored in Cloudinary. */
function deliveryUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    secure: true,
    transformation: [
      {
        width: galleryMaxWidth(),
        crop: "limit",
        fetch_format: "auto",
        quality: "auto:good",
      },
    ],
  });
}

function mapResources(
  resources: CloudinaryResource[],
  folder: string,
): GallerySlide[] {
  return resources
    .filter((r) => r.resource_type === "image" && r.public_id)
    .map((resource) => {
      const custom = resource.context?.custom;
      const alt =
        custom?.alt?.trim() ||
        custom?.caption?.trim() ||
        humanizePublicId(resource.public_id, folder);
      return {
        src: deliveryUrl(resource.public_id),
        alt,
      };
    });
}

function galleryCacheSeconds(): number {
  const raw = process.env.CLOUDINARY_GALLERY_CACHE_SECONDS?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : 300;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 300;
}

async function listBySearch(folder: string): Promise<GallerySlide[]> {
  const escaped = folder.replace(/"/g, '\\"');
  const result = await cloudinary.search
    .expression(`folder="${escaped}" AND resource_type:image`)
    .sort_by("created_at", "desc")
    .max_results(500)
    .execute();

  const resources = (result.resources ?? []) as CloudinaryResource[];
  return mapResources(resources, folder);
}

async function listByPrefix(folder: string): Promise<GallerySlide[]> {
  const prefix = folder.endsWith("/") ? folder : `${folder}/`;
  const slides: GallerySlide[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      prefix,
      max_results: 500,
      next_cursor: nextCursor,
    });

    slides.push(
      ...mapResources((result.resources ?? []) as CloudinaryResource[], folder),
    );
    nextCursor = result.next_cursor as string | undefined;
  } while (nextCursor);

  return slides;
}

async function fetchCloudinaryGallerySlidesUncached(): Promise<GallerySlide[]> {
  if (!cloudinaryConfigured()) return [];

  configureCloudinary();
  const folder = galleryFolderName();

  try {
    const fromSearch = await listBySearch(folder);
    if (fromSearch.length > 0) return fromSearch;
  } catch {
    /* try path prefix */
  }

  try {
    return await listByPrefix(folder);
  } catch {
    return [];
  }
}

const fetchCloudinaryGallerySlides = unstable_cache(
  fetchCloudinaryGallerySlidesUncached,
  ["cloudinary-gallery-slides-v4"],
  { revalidate: galleryCacheSeconds(), tags: ["cloudinary-gallery"] },
);

export async function loadCloudinaryGallerySlides(): Promise<GallerySlide[]> {
  return fetchCloudinaryGallerySlidesUncached();
}

export async function getCloudinaryGallerySlides(): Promise<GallerySlide[]> {
  if (process.env.NODE_ENV === "development") {
    return fetchCloudinaryGallerySlidesUncached();
  }
  return fetchCloudinaryGallerySlides();
}

/** Console URL for the folder in Cloudinary Media Library (not a public JSON feed). */
export function cloudinaryGalleryConsoleUrl(): string | null {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  if (!cloud) return null;
  const folder = encodeURIComponent(galleryFolderName());
  return `https://console.cloudinary.com/console/media_library/folders/all/${folder}?cloudName=${cloud}`;
}

export { galleryFolderName, cloudinaryConfigured };
