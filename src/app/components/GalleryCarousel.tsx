"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ProtectedImage from "@/app/components/ProtectedImage";
import type { GallerySlide } from "@/lib/galleryCarousel";

function scrollSlideToCenter(track: HTMLElement, slide: HTMLElement) {
  const target =
    slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2;
  const maxScroll = track.scrollWidth - track.clientWidth;
  const left = Math.max(0, Math.min(target, maxScroll));

  track.style.scrollSnapType = "none";
  track.scrollTo({ left, behavior: "smooth" });

  const restoreSnap = () => {
    track.style.scrollSnapType = "";
  };
  track.addEventListener("scrollend", restoreSnap, { once: true });
  window.setTimeout(restoreSnap, 600);
}

function indexNearestCenter(track: HTMLElement): number {
  const trackCenter = track.scrollLeft + track.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;

  for (let i = 0; i < track.children.length; i++) {
    const slide = track.children[i] as HTMLElement;
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const distance = Math.abs(slideCenter - trackCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
}

export default function GalleryCarousel({ slides }: { slides: GallerySlide[] }) {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const programmaticScrollRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;

      const clamped = (index + slides.length) % slides.length;
      const slide = track.children.item(clamped) as HTMLElement | null;
      if (!slide) return;

      programmaticScrollRef.current = true;
      setActiveIndex(clamped);
      scrollSlideToCenter(track, slide);

      window.setTimeout(() => {
        programmaticScrollRef.current = false;
      }, 500);
    },
    [slides.length],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncFromScroll = () => {
      if (programmaticScrollRef.current) return;
      setActiveIndex(indexNearestCenter(track));
    };

    track.addEventListener("scrollend", syncFromScroll);
    return () => track.removeEventListener("scrollend", syncFromScroll);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section
      className="mt-16 pt-12 border-t border-outline-variant/25 -mx-6 md:-mx-12"
      aria-labelledby="home-gallery-heading"
    >
      <div className="text-center mb-8 max-w-2xl mx-auto px-6 md:px-12">
        <h2
          id="home-gallery-heading"
          className="text-3xl md:text-4xl font-headline font-extrabold text-primary tracking-tight mb-3"
        >
          {t("home.gallery.title")}
        </h2>
        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
          {t("home.gallery.subtitle")}
        </p>
      </div>

      <div className="relative px-2 sm:px-4 md:px-8">
        <div
          ref={trackRef}
          className="flex gap-5 md:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          aria-label={t("home.gallery.carouselLabel")}
        >
          {slides.map((slide, index) => (
            <figure
              key={`${slide.src}-${index}`}
              data-index={index}
              className="snap-center shrink-0 w-[92%] sm:w-[88%] md:w-[85%] lg:w-[min(72rem,90%)]"
            >
              <ProtectedImage
                src={slide.src}
                alt={slide.alt}
                priority={index === 0}
                className="w-full min-h-[280px] sm:min-h-[380px] md:min-h-[480px] lg:min-h-[560px] aspect-[4/3] md:aspect-[3/2] object-cover rounded-3xl shadow-xl border border-outline-variant/20"
              />
            </figure>
          ))}
        </div>

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex - 1)}
              className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg hover:scale-105 transition-transform"
              aria-label={t("home.gallery.prev")}
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg hover:scale-105 transition-transform"
              aria-label={t("home.gallery.next")}
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {slides.map((slide, index) => (
                <button
                  key={`dot-${slide.src}-${index}`}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  className={[
                    "h-2.5 rounded-full transition-all",
                    index === activeIndex
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-primary/25 hover:bg-primary/40",
                  ].join(" ")}
                  aria-label={t("home.gallery.goToSlide", { number: index + 1 })}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
