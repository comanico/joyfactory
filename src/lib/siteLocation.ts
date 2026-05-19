/** Address used for directions and contact page. */
export const SITE_MAP_QUERY =
  "str. I.M. Klein, nr. 10, Făgăraș, județul Brașov, Romania";

/** FunFactory — embed from Google Maps → Share → Embed a map */
export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2779.267826942614!2d24.96496017682774!3d45.84593887108285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474ca1b9c2e3b5db%3A0xde058dcea4403713!2sFunFactory!5e0!3m2!1sro!2sro!4v1779175508214!5m2!1sro!2sro";

/** Opens the FunFactory place in Google Maps */
export const GOOGLE_MAPS_PLACE_URL =
  "https://www.google.com/maps/place/FunFactory/@45.8459389,24.9675351,17z";

/**
 * Google Maps embed URL. Override with `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` in `.env` if needed.
 */
export function getGoogleMapsEmbedUrl(): string {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL?.trim() ||
    GOOGLE_MAPS_EMBED_URL
  );
}

export function getGoogleMapsOpenUrl(): string {
  return GOOGLE_MAPS_PLACE_URL;
}
