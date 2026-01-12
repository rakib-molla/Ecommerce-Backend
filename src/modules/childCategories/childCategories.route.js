import express from "express";
import { childCategoriesControllers } from "./childCategories.controllers.js";

const router= express.Router();

// Define child categories routes here
router.get("/", childCategoriesControllers.getAllChildCategories);
router.post("/", childCategoriesControllers.addChildCategories);

export default router;