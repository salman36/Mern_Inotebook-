import express from "express";
import { body } from 'express-validator';

import {
  loginUser,
  registerUser,
  logout,
  forgotPassword,
} from "../Controllers/UserController.js";

const registrationValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters'),
];


const userRouter = express.Router();

userRouter.route("/register").post(registrationValidationRules, registerUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").get(logout);

userRouter.route("/password/forgot").post(forgotPassword);

export default userRouter;
