import { readFile } from "fs/promises";
import path from "path";
import { type NextRequest, NextResponse } from "next/server";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

function extOf(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".jpeg")) return ".jpeg";
  if (lower.endsWith(".jpg")) return ".jpg";
  if (lower.endsWith(".png")) return ".png";
  if (lower.endsWith(".webp")) return ".webp";
  if (lower.endsWith(".gif")) return ".gif";
  if (lower.endsWith(".svg")) return ".svg";
  return path.extname(filename).toLowerCase();
}

function requestAllowed(req: NextRequest): boolean {
  const host = req.headers.get("host");
  if (!host) return false;

  const secFetchSite = req.headers.get("sec-fetch-site");
  if (secFetchSite === "same-origin" || secFetchSite === "same-site") {
    return true;
  }

  const referer = req.headers.get("referer");
  if (referer) {
    try {
      if (new URL(referer).host === host) return true;
    } catch {
      /* ignore invalid referer */
    }
  }

  const origin = req.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host === host) return true;
    } catch {
      /* ignore invalid origin */
    }
  }

  return false;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  if (!requestAllowed(req)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const { path: segments } = await context.params;
  if (!segments?.length || segments.some((s) => s === ".." || s.includes(".."))) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filename = segments.map((s) => decodeURIComponent(s)).join("/");
  const ext = extOf(filename);
  const mime = MIME[ext];
  if (!mime) {
    return new NextResponse("Not found", { status: 404 });
  }

  const data = await readPublicFile(filename);
  if (!data) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(new Uint8Array(data), {
    headers: {
      "Content-Type": mime,
      "Content-Disposition": "inline",
      "Cache-Control": "private, max-age=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

/** Try .JPG URL and common on-disk spellings (Linux is case-sensitive). */
function fileCandidates(filename: string): string[] {
  const base = path.basename(filename);
  const dir = path.dirname(filename);
  const prefix = dir === "." ? "" : `${dir}/`;

  if (/\.(jpe?g)$/i.test(base)) {
    const stem = base.replace(/\.(jpe?g)$/i, "");
    const names = [
      `${stem}.JPG`,
      `${stem}.jpg`,
      `${stem}.jpeg`,
      `${stem}.JPEG`,
      base,
    ];
    return [...new Set(names.map((n) => `${prefix}${n}`))];
  }

  return [filename];
}

async function readPublicFile(filename: string): Promise<Buffer | null> {
  const publicDir = path.join(process.cwd(), "public");

  for (const candidate of fileCandidates(filename)) {
    try {
      return await readFile(path.join(publicDir, candidate));
    } catch {
      /* try next spelling */
    }
  }

  return null;
}
