import { mediaUrl } from "@/lib/mediaUrl";
import type { GallerySlide } from "@/lib/galleryCarousel";

/** Site photos already used across FunFactory pages (served via /media). */
const PROJECT_GALLERY = [
  { file: "ball-pit-homepage.JPG", altKey: "home.gallery.slides.ballPit" },
  { file: "memories.JPG", altKey: "home.gallery.slides.memories" },
  { file: "jungle.JPG", altKey: "home.gallery.slides.jungle" },
  { file: "climbing-homepage.JPG", altKey: "home.gallery.slides.climbing" },
  { file: "society.JPG", altKey: "home.gallery.slides.society" },
  { file: "imagination.JPG", altKey: "home.gallery.slides.imagination" },
  { file: "climber.JPG", altKey: "home.gallery.slides.climber" },
  { file: "relax.JPG", altKey: "home.gallery.slides.relax" },
  { file: "screen.JPG", altKey: "home.gallery.slides.screen" },
  { file: "cloud.JPG", altKey: "home.gallery.slides.cloud" },
  { file: "cafenea.JPG", altKey: "home.gallery.slides.cafe" },
  { file: "basic.JPG", altKey: "home.gallery.slides.package1" },
  { file: "start.JPG", altKey: "home.gallery.slides.package2" },
] as const;

export function getProjectGallerySlides(
  t: (key: string) => string,
): GallerySlide[] {
  return PROJECT_GALLERY.map(({ file, altKey }) => ({
    src: mediaUrl(file),
    alt: t(altKey),
  }));
}
