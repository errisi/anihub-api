/* eslint-disable @typescript-eslint/no-explicit-any */
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

export const s3Upload = async (image: any) => {
  const s3 = new S3();

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `images/${uuid()}-${image.originalname}`,
    Body: image.buffer,
  };

  return await s3.upload(params).promise();
};
