import express from 'express';
import userRouter from '../modules/user/user.route.js';
import getHealthStatus from '../modules/health/health.controller.js';
import categoryRouter from '../modules/categories/categories.route.js';
import subCategoriesRouter from '../modules/subCategories/subCategories.route.js';
import childCategoriesRouter from '../modules/childCategories/childCategories.route.js';
import productRouter from '../modules/product/product.routes.js';
const router = express.Router();

// mount all routes
router.use('/users', userRouter);
router.get("/health", getHealthStatus);
router.use('/categories', categoryRouter);
router.use('/sub-categories', subCategoriesRouter);
router.use('/child-categories', childCategoriesRouter);
router.use('/product', productRouter);

export default router;