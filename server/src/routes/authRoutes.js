import { Router } from 'express';
import { loginUserController, getMeController, logoutUserController} from '../controllers/authController.js';
import { authUser } from '../middleware/auth.js';

const router = Router();

router.post('/login', loginUserController);
router.get('/getMe', authUser, getMeController);
router.get('/logout', logoutUserController);

export { router };