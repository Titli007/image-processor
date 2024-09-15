import { Router } from 'express';
import { uploadImage } from '../controllers/imageController';
import multer from 'multer';
import { processImage } from '../../image_process';

const router = Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for images

// Upload image
router.post('/upload', upload.single('image'), uploadImage);

// Process image
router.post('/process', processImage);

export default router;
