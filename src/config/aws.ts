import { NextFunction, Response, Request } from 'express';
import AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import dotenv from 'dotenv';

dotenv.config();

const { AWS_ACCESS_ID, AWS_SECRET_KEY, AWS_MEDIA_BUCKET } = process.env;

const S3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_ID,
  secretAccessKey: AWS_SECRET_KEY,
});

export async function uploadFileToAws(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const imagemin = require('imagemin');

  const { buffer } = req.file;

  const image = await imagemin.buffer(buffer);

  const params = {
    Bucket: AWS_MEDIA_BUCKET as string,
    Key: req.file.originalname,
    Body: image,
    ContentType: 'image/png',
    ACL: 'public-read',
  };

  const uploadResult = await new Promise<ManagedUpload.SendData>(
    (resolve, reject) => {
      S3.upload(params, (err: Error, data: ManagedUpload.SendData) =>
        err === null ? resolve(data) : next(reject(err))
      );
    }
  );

  res.send({ uploadUrl: uploadResult.Location });
}
