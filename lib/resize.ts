import sharp from 'sharp';

export async function resizeImage(
  file: File,
  width: number,
  height?: number
): Promise<File> {
  const buffer = await file.arrayBuffer();
  const resizedImage = await sharp(buffer).resize(width, height).toBuffer();

  return new File([resizedImage], file.name, { type: file.type });
}
