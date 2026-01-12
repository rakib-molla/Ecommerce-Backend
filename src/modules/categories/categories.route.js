import express from 'express';
import { categoriesController } from './categories.controller.js';

const router = express.Router();

router.post('/', categoriesController.addCategoriesController)
router.get('/', categoriesController.getAllCategoriesController)

export default router;