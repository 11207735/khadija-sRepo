/**
 * Image Registry for Khadija's Birthday Reflection Experience.
 *
 * When you upload or provide an image into `src/img/`, you can register it here
 * or import it directly into components.
 */

// Dynamically discover any images placed inside this folder (jpg, jpeg, png, webp, svg, gif)
export const localImages = import.meta.glob<{ default: string }>(
  './*.{png,jpg,jpeg,webp,svg,gif}',
  { eager: true }
);

/**
 * Helper to get an image URL by filename from src/img/
 * Example: getImage('khadija.jpg')
 */
export function getImg(filename: string): string | null {
  const matchingKey = Object.keys(localImages).find((key) =>
    key.toLowerCase().endsWith(filename.toLowerCase())
  );
  if (matchingKey && localImages[matchingKey]) {
    return localImages[matchingKey].default;
  }
  return null;
}

/**
 * Preset slots where you can configure specific images
 */
export interface ImageSlots {
  portrait?: string;
  greetingHeader?: string;
  outroKeepsake?: string;
  memoryGallery?: string[];
}

export const appImages: ImageSlots = {
  outroKeepsake: '/src/assets/images/end_background_1792083400388.jpg',
};
