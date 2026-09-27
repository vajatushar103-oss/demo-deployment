import { Router } from 'express';
import { createUser, getUsers, updateUser } from '../controllers/userController.js';
import { authUser, requireRole } from '../middleware/auth.js';

const router = Router();

router.use(authUser, requireRole('admin'));
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:id', updateUser);

export default router;
