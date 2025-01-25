import express from "express";
import { validateCategory } from "../middleware/validator.js";
import {
  createSubcategory,
  getSubcategories,
  getSubcategoryById,
  getSubcategoriesByCategory,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategoryController.js";

const router = express.Router();

router.post("/", validateCategory, createSubcategory);
router.get("/", getSubcategories);
router.get("/:id", getSubcategoryById);
router.get("/category/:categoryId", getSubcategoriesByCategory);
router.put("/:id", validateCategory, updateSubcategory);
router.delete("/:id", deleteSubcategory);

export default router;
