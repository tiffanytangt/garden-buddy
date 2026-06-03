import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadImageToS3 = async (file: File): Promise<string> => {
  // Prefix with a UUID so uploads never collide on filename. Without this,
  // two files with the same name (e.g. compressed photos all named "blob", or
  // repeated camera names) overwrite each other in S3 and multiple Photo rows
  // end up pointing at the same — wrong — image.
  const key = `dev/${randomUUID()}-${file.name}`;
  const uploadParams: PutObjectCommandInput = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: key,
    Body: (await file.arrayBuffer()) as Buffer,
  };

  await s3Client.send(new PutObjectCommand(uploadParams));

  return `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${key}`;
};

export const deleteImageFromS3 = async (location: string): Promise<void> => {
  // Stored locations are full URLs; the S3 key is the path after the host.
  let key: string;
  try {
    key = decodeURIComponent(new URL(location).pathname.replace(/^\//, ''));
  } catch {
    return; // Not a parseable URL — nothing we can delete.
  }
  if (!key) return;

  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: key,
    })
  );
};
