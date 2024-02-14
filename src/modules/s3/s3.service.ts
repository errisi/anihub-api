/* eslint-disable @typescript-eslint/no-explicit-any */
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const s3Upload = async (image: any, uuid: any) => {
  const s3 = new S3Client();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `images/${uuid}-${image.originalname}`,
    Body: image.buffer,
  };

  return await s3.send(new PutObjectCommand(params));
};
