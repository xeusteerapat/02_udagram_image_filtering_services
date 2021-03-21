import { Router } from 'express';
import { uploadFileToAws } from '../config/aws';
import { processImage, withoutAWS } from './../controllers/image';
import { requireAuth } from './../middleware/auth';
import multer from 'multer';

const router = Router();

const uploadFile = multer({
  dest: 'uploads/',
}).single('file');

router.post('/upload', requireAuth, uploadFile, uploadFileToAws);
router.post('/test-upload-route', requireAuth, withoutAWS);
router.get('/filteredimage', requireAuth, processImage);

export default router;
