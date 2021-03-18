import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import path from 'path';
import fs from 'fs';

dotenv.config();

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(express.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  app.get(
    '/v0/filteredimage',
    async (req: Request, res: Response, next: NextFunction) => {
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
    }
  );
  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get('/', async (req, res) => {
    res.send({
      success: true,
      data: 'Hello, Welcome to Udagram Image Filtering',
    });
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`Server running http://localhost:${port} 🚀`);
    console.log(`Press CTRL+C to stop server`);
  });
})();
