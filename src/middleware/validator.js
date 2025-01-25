import { body, validationResult } from "express-validator";

export const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category name must be between 2 and 50 characters"),
  body("image")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Invalid image URL"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("taxApplicability")
    .isBoolean()
    .withMessage("Tax applicability must be true or false"),
  body("tax")
    .if(body("taxApplicability").equals("true"))
    .isFloat({ min: 0, max: 100 })
    .withMessage("Tax must be between 0 and 100"),
  body("taxType")
    .if(body("taxApplicability").equals("true"))
    .isIn(["PERCENTAGE", "FIXED"])
    .withMessage("Tax type must be either PERCENTAGE or FIXED"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];
