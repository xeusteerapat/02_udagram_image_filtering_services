import { Router, Request, Response, NextFunction } from 'express';
import { requireAuth, hashPassword } from './../middleware/auth';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testHash = await hashPassword(process.env.AWS_ACCESS_ID);

    res.send('Success');
  } catch (error) {
    next(error);
  }
});

export default router;
