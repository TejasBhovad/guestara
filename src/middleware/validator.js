import { body, validationResult } from "express-validator";
import pkg from "mongoose";
const { isValidObjectId } = pkg;
import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";

const getCurrentTimestamp = () => "2025-01-25 18:13:00";
const CURRENT_USER = "TejasBhovad";

export const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
  body("image")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Invalid image URL"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        timestamp: getCurrentTimestamp(),
        user: CURRENT_USER,
      });
    }
    next();
  },
];

export const validateSubcategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Subcategory name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Subcategory name must be between 2 and 50 characters"),
  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .custom(async (value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Invalid Category ID format");
      }
      const category = await Category.findById(value);
      if (!category) {
        throw new Error("Category not found");
      }
      return true;
    }),
  body("image")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Invalid image URL"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),
  body("taxApplicability")
    .optional()
    .isBoolean()
    .withMessage("Tax applicability must be true or false"),
  body("tax")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Tax must be between 0 and 100"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        timestamp: getCurrentTimestamp(),
        user: CURRENT_USER,
      });
    }
    next();
  },
];

export const validateItem = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Item name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Item name must be between 2 and 100 characters"),
  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .custom(async (value) => {
      if (!isValidObjectId(value)) {
        throw new Error("Invalid Category ID format");
      }
      try {
        const category = await Category.findById(value);
        if (!category) {
          throw new Error("Category not found");
        }
        return true;
      } catch (error) {
        throw new Error("Error validating category");
      }
    }),
  body("subcategoryId")
    .optional()
    .custom(async (value) => {
      if (value) {
        if (!isValidObjectId(value)) {
          throw new Error("Invalid Subcategory ID format");
        }
        try {
          const subcategory = await Subcategory.findById(value);
          if (!subcategory) {
            throw new Error("Subcategory not found");
          }
        } catch (error) {
          throw new Error("Error validating subcategory");
        }
      }
      return true;
    }),
  body("image")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Invalid image URL"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),
  body("taxApplicability")
    .notEmpty()
    .withMessage("Tax applicability is required")
    .isBoolean()
    .withMessage("Tax applicability must be true or false"),
  body("tax")
    .if(body("taxApplicability").equals(true))
    .notEmpty()
    .withMessage("Tax is required when tax is applicable")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Tax must be between 0 and 100"),
  body("baseAmount")
    .notEmpty()
    .withMessage("Base amount is required")
    .isFloat({ min: 0 })
    .withMessage("Base amount must be greater than 0"),
  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be greater than or equal to 0")
    .custom((value, { req }) => {
      if (value && value > req.body.baseAmount) {
        throw new Error("Discount cannot be greater than base amount");
      }
      return true;
    }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
        timestamp: getCurrentTimestamp(),
        user: CURRENT_USER,
      });
    }
    next();
  },
];
