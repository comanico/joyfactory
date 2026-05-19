/** Site-only image URLs (served via /media with referer checks). */
export function mediaUrl(filename: string): string {
  const normalized = filename.replace(/\.(jpe?g)$/i, ".JPG");
  const encoded = normalized
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `/media/${encoded}`;
}
