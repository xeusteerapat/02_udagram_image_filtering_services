import { Request, Response, NextFunction } from 'express';
import { deleteLocalFiles, filterImageFromURL } from '../util/util';

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
