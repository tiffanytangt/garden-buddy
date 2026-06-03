'use client';

import imageCompression from 'browser-image-compression';

/**
 * Compresses/resizes an image in the browser before upload.
 *
 * Keeps Server Action payloads small and reliable (large phone photos can be
 * 3-12MB, which otherwise blow past the request body limit). Orientation is
 * baked in and EXIF stripped by the canvas, consistent with the server-side
 * `.rotate()` in lib/resize.ts.
 *
 * Non-image files are returned unchanged. On failure we fall back to the
 * original file — the raised body limit and server-side resize still apply.
 *
 * @param file - The image file to compress.
 * @returns A compressed image file (or the original on failure / non-image).
 */
export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file;
  try {
    const compressed = await imageCompression(file, {
      maxWidthOrHeight: 1600, // matches the server-side resize cap
      maxSizeMB: 1.5,
      useWebWorker: true,
    });
    // imageCompression can drop the original name (returns a "blob"); restore it
    // so the eventual S3 key stays meaningful.
    return new File([compressed], file.name, { type: compressed.type });
  } catch {
    return file;
  }
}
