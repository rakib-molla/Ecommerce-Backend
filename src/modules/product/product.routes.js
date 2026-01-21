import express from 'express';
import { productControllers } from './Product.controllers.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/', productControllers.getAllProduct);
router.post('/',authMiddleware.authUserChecking,authMiddleware.authAdminChecking, productControllers.createProduct);


export default router