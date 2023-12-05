import express from 'express';
import {
   authUser,
   logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/usercController.js'
import { admin,protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout',logoutUser);
router.post('/auth', authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);

router.route('/:id').get(protect,admin,getUserById).put(protect,admin,updateUser).delete(protect,admin,deleteUser);

export default router;

