import express from "express";
import { subCategoriesController } from "./subCategories.controller.js";

const router = express.Router();

router.post("/", subCategoriesController.addSubCategoryController);
router.get("/", subCategoriesController.getAllSubCategoriesController);

export default router;