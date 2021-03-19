import { register, login } from './../controllers/user';
import { Router } from 'express';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
