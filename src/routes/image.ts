import { processImage } from './../controllers/image';
import { Router } from 'express';
import { uploadFileToAws } from '../config/aws';

const router = Router();

router.post('/upload', uploadFileToAws);
router.get('/filteredimage', processImage);

export default router;
