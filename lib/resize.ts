import sharp from 'sharp';

/**
 * Resizes an image file to the specified width and height.
 *
 * @param file - The image file to be resized.
 * @param width - The desired width of the resized image.
 * @param height - The desired height of the resized image. If not provided, the height will be calculated to maintain the aspect ratio.
 * @param options - Additional options for resizing.
 * @param options.allowEnlargement - If true, allows upsizing the image. Default is false.
 * @returns A new image file with the specified dimensions.
 */
export async function resizeImage(
  file: File,
  width: number,
  height?: number,
  options: { allowEnlargement?: boolean } = {}
): Promise<File> {
  const buffer = await file.arrayBuffer();
  const resizedImage = await sharp(buffer)
    .resize({
      width,
      height,
      withoutEnlargement: !options.allowEnlargement,
    })
    .toBuffer();

  return new File([resizedImage], file.name, { type: file.type });
}
