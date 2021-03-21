import { Router } from 'express';
import { uploadFileToAws } from '../config/aws';
import { processImage } from './../controllers/image';
import { requireAuth } from './../middleware/auth';
import multer from 'multer';

const router = Router();

const uploadFile = multer({
  storage: multer.memoryStorage(),
}).single('file');

router.post('/upload', requireAuth, uploadFile, uploadFileToAws);
router.get('/filteredimage', requireAuth, processImage);

export default router;
