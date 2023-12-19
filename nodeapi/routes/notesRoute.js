import express from "express";
import { body } from 'express-validator';
import {
    isAuthenticateUser,
  } from "../middleware/authenticate.js";

import {
    getAllNotes,
    saveNotes,
    updateNotes,
    deleteNotes
} from "../Controllers/NotesController.js";

const notesValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('discription').notEmpty().withMessage('Discription is required'),
  body('tag').notEmpty().withMessage('Tag is required'),
];


const notesRouter = express.Router();

notesRouter.route("/all").get(isAuthenticateUser,getAllNotes);
notesRouter.route("/store").post(isAuthenticateUser,saveNotes);
notesRouter.route("/update/:id").put(isAuthenticateUser,updateNotes)
notesRouter.route("/delete/:id").delete(isAuthenticateUser,deleteNotes)

export default notesRouter;
