import express from "express";
import { validateItem } from "../middleware/validator.js";
import {
  createItem,
  getAllItems,
  getItemsByCategory,
  getItemsBySubcategory,
  getItem,
  updateItem,
} from "../controllers/itemController.js";
import {
  searchAll,
  searchItems,
  searchByCategory,
  searchBySubcategory,
} from "../controllers/searchController.js";

const router = express.Router();

router.post("/", validateItem, createItem);
router.get("/", getAllItems);
router.get("/category/:categoryId", getItemsByCategory);
router.get("/subcategory/:subcategoryId", getItemsBySubcategory);
router.get("/:identifier", getItem);
router.put("/:id", validateItem, updateItem);

router.get("/search/all", searchAll);
router.get("/search/items", searchItems);
router.get("/search/category", searchByCategory);
router.get("/search/subcategory", searchBySubcategory);

export default router;
