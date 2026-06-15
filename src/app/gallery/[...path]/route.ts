import { type NextRequest, NextResponse } from "next/server";
import {
  readGalleryManifestFile,
  readGalleryVolumeFile,
} from "@/lib/galleryVolume";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;
  if (!segments?.length || segments.some((s) => s === ".." || s.includes(".."))) {
    return new NextResponse("Not found", { status: 404 });
  }

  const relativePath = segments.map((s) => decodeURIComponent(s)).join("/");

  if (relativePath === "manifest.json") {
    const manifest = await readGalleryManifestFile();
    if (!manifest) {
      return new NextResponse("Not found", { status: 404 });
    }
    return new NextResponse(new Uint8Array(manifest), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
      },
    });
  }

  const file = await readGalleryVolumeFile(relativePath);
  if (!file) {
    return new NextResponse("Not found", { status: 404 });
  }

  const mime = MIME[file.ext];
  if (!mime) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(new Uint8Array(file.data), {
    headers: {
      "Content-Type": mime,
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
