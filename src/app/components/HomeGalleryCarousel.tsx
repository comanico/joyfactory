import GalleryCarousel from "@/app/components/GalleryCarousel";
import { getGalleryCarouselSlides } from "@/lib/galleryCarousel";
import { getProjectGallerySlides } from "@/lib/defaultGallerySlides";
import { getServerT } from "@/i18n/server";

export default async function HomeGalleryCarousel() {
  const t = await getServerT();
  const configured = await getGalleryCarouselSlides();
  const slides =
    configured.length > 0 ? configured : getProjectGallerySlides(t);

  return <GalleryCarousel slides={slides} />;
}
