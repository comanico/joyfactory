/**
 * Optional local Cloudinary smoke test (not used by the live site).
 * Run: pnpm exec tsx scripts/cloudinary-onboarding.ts
 * Requires CLOUDINARY_* vars in .env — same as production gallery.
 */
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

if (!cloudName || !apiKey || !apiSecret) {
  console.error(
    "Missing CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, or CLOUDINARY_API_SECRET in .env",
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const DEMO_IMAGE_URL =
  "https://res.cloudinary.com/demo/image/upload/sample.jpg";

async function main() {
  console.log("Uploading demo image...\n");

  const upload = await cloudinary.uploader.upload(DEMO_IMAGE_URL);

  console.log("Upload complete.");
  console.log("Secure URL:", upload.secure_url);
  console.log("Public ID:", upload.public_id);
  console.log();

  console.log("Fetching image details...\n");

  const details = await cloudinary.api.resource(upload.public_id);

  console.log("Width:", details.width);
  console.log("Height:", details.height);
  console.log("Format:", details.format);
  console.log("Bytes:", details.bytes);
  console.log();

  // f_auto: serve WebP/AVIF when the browser supports it (smaller, faster loads)
  // q_auto: pick compression quality automatically per image content
  const transformedUrl = cloudinary.url(upload.public_id, {
    secure: true,
    transformation: [{ fetch_format: "auto", quality: "auto" }],
  });

  console.log(
    "Done! Click link below to see optimized version of the image. Check the size and the format.",
  );
  console.log(transformedUrl);
}

main().catch((error: unknown) => {
  console.error("Cloudinary onboarding failed:", error);
  process.exit(1);
});
