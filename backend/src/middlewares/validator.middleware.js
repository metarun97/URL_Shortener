// Imported items:-
import { body, validationResult } from "express-validator";

// Error arrays respond:-
const respondWithVelidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }
  next();
}

// Register validation rules:-
export const registerUserValidation = [
  body("name")
    .isString()
    .withMessage("name must be string")
    .notEmpty()
    .withMessage("name must be required")
    .isLength({ min: 3 })
    .withMessage("name must be atleast 3 charachter long"),
  body("email")
    .notEmpty()
    .withMessage("email must be required")
    .isString()
    .withMessage("Invalid email address")
    .withMessage("email must be string"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be 6 or more charachter long"),
  body("fullName.firstName")
    .isString()
    .withMessage("firstName must be a string")
    .notEmpty()
    .withMessage("firstName is required"),
  body("fullName.lastName")
    .isString()
    .withMessage("lastName must be a string")
    .notEmpty()
    .withMessage("lastName is required"),
  respondWithVelidationErrors
]

// Login validation rules:-
export const loginUserValidation = [
  body("name")
    .isString()
    .optional()
    .withMessage("Invalid name credential"),
  body("email")
    .optional()
    .isString()
    .withMessage("Invalid email credential"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Invalid password credential"),
  respondWithVelidationErrors
]
