import express from 'express';
// import { userRoutes } from '../modules/user/user.route.js';
import userRouter from '../modules/user/user.route.js';
import getHealthStatus from '../modules/health/health.controller.js';
import categoryRouter from '../modules/categories/categories.route.js';
import subCategoriesRouter from '../modules/subCategories/subCategories.route.js';
const router = express.Router();

// mount all routes
router.use('/users', userRouter);
router.get("/health", getHealthStatus);
router.use('/categories', categoryRouter);
router.use('/sub-categories', subCategoriesRouter);

export default router;