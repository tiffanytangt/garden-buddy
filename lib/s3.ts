import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
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
