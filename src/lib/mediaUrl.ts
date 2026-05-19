/** Site-only image URLs (served via /media with referer checks). */
export function mediaUrl(filename: string): string {
  const encoded = filename
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `/media/${encoded}`;
}
