import { body } from "express-validator";
import { validatorFn } from "../middleware/validatorMiddleware";

export const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  body("age").notEmpty().withMessage("Age is required"),

  body("gender").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("A valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "user"])
    .withMessage("Invalid role"),
  validatorFn,
];

export const loginValidator = [
  body("email").isEmail().withMessage("A valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validatorFn,
];
