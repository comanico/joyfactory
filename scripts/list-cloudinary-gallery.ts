import "dotenv/config";
import {
  cloudinaryGalleryConsoleUrl,
  galleryFolderName,
  loadCloudinaryGallerySlides,
} from "../src/lib/cloudinaryGallery";

async function main() {
  const folder = galleryFolderName();
  console.log("Folder:", folder);
  console.log("Console:", cloudinaryGalleryConsoleUrl());
  console.log();

  const slides = await loadCloudinaryGallerySlides();
  console.log(`Found ${slides.length} image(s):\n`);
  for (const slide of slides) {
    console.log(`- ${slide.alt}`);
    console.log(`  ${slide.src}\n`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
