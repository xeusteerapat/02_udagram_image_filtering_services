import { NextFunction, Response, Request } from 'express';
import AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';

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
  try {
    const fileName = req.file.originalname;
    const pathToFile =
      __dirname.replace('/config', '') + '/uploads/' + req.file.filename;
    const fileBuffer = readFileSync(pathToFile);

    const params = {
      Bucket: AWS_MEDIA_BUCKET as string,
      Key: `${new Date().getTime()}-${fileName}`,
      Body: fileBuffer,
      ContentType: 'image/png',
      ACL: 'public-read-write',
    };

    const uploadResult = await new Promise<ManagedUpload.SendData>(
      (resolve, reject) => {
        S3.upload(params, (err: Error, data: ManagedUpload.SendData) =>
          err === null ? resolve(data) : next(reject(err))
        );
      }
    );

    res.send({ uploadUrl: uploadResult.Location });
  } catch (error) {
    next(error);
  }
}
