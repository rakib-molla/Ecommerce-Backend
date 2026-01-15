import express from 'express';
import { productControllers } from './Product.controllers.js';


const router = express.Router();

router.get('/', productControllers.getAllProduct);
router.post('/', productControllers.createProduct);


export default router