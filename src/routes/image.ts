import { Router } from 'express';
import { uploadFileToAws } from '../config/aws';
import { processImage } from './../controllers/image';
import { requireAuth } from './../middleware/auth';

const router = Router();

router.post('/upload', requireAuth, uploadFileToAws);
router.get('/filteredimage', requireAuth, processImage);

export default router;
