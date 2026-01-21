import express from 'express';
import { userControllers } from './user.controllers.js';


const router = express.Router();

router.get('/', userControllers.getAllUsersControllers);
router.post('/', userControllers.createUserControllers);
router.post('/auth/login', userControllers.loginUserControllers);


export  default router;