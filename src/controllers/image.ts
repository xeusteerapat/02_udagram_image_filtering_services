import { Request, Response, NextFunction } from 'express';
import { deleteLocalFiles, filterImageFromURL } from '../util/util';
import path from 'path';

export const processImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const image_url = req.query.image_url as string;

    const filteredImage = await filterImageFromURL(image_url);

    res.sendFile(filteredImage);

    setTimeout(() => {
      deleteLocalFiles([filteredImage]);
    }, 2000);
  } catch (error) {
    next(error);
  }
};

export const withoutAWS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const fileName = req.file.originalname;

    res.send({ status: 'I AM NOT STUCK WITH MIDDLEWARE' });
  } catch (error) {
    next(error);
  }
};
