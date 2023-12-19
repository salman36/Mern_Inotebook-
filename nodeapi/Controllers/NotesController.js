import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import NotesModel from "../Models/Notes.js";
import { validationResult } from 'express-validator';


//''''''''''''''''''''''' get all notes ''''''''''''''''''''''''''''''//
export const getAllNotes = catchAsyncErrors(async (req, res, next) => {

    try {
        // const search = req.query.search;
        const totalCount = await NotesModel.countDocuments();
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        // console.log(startIndex + "|" + endIndex);
        const notes = await NotesModel
          .find({ user: req.user.id  })
          .skip(startIndex)
          .limit(endIndex);
        notes.forEach((notesPath) => {
          notesPath.path = `${req.protocol}://${req.hostname}:${process.env.PORT}/${notesPath.path}`;
        });
        const totalPage = Math.ceil(totalCount / limit);
    
        res
          .status(200)
          .json({ message: "success", notes, totalPage, totalCount });
      } catch (error) {
        res.status(500).json({ message: "error" + error });
      }
  
});

//''''''''''''''''''''''' save notes ''''''''''''''''''''''''''''''//

export const saveNotes = catchAsyncErrors(async (req, res, next) => {

  try {
    const { title, description, tag } = req.body;
    

      const notes = new NotesModel({
        title,description,tag,user:req.user.id
      })
      const saveNotes = await notes.save();
    res.status(201).json({ message: "success", saveNotes });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
  
});

// ''''''''''''''''''' update notes ''''''''''''''''''''''''''''''''''''//

export const updateNotes = async (req, res, next) => {

  const {title,description,tag} =  req.body;
    try {

      const newNote = {};
      if(title){newNote.title = title};
      if(description){newNote.description = description};
      if(tag){newNote.tag = tag};

      // find the note to be updated and update it
      let note = await NotesModel.findById(req.params.id);
      if (!note) {
          return next(new ErrorHandler("Note not found", 404));
        }
      if (note.user.toString() !== req.user.id) {
          return next(new ErrorHandler("Note Allowed", 401));
        }
      note = await  NotesModel.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
      res.status(201).json({ message: "success", note }); 
      
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "error" + error });
    }
  
  
};

//'''''''''''''''''''''' Delete Note ''''''''''''''''''''''''''''''''''//

export const deleteNotes = async (req, res, next) => {
      const {title,description,tag} =  req.body;
    try {
        // find the note to be delete and delete it
        let note = await NotesModel.findById(req.params.id);
        if (!note) {
            return next(new ErrorHandler("Note not found", 404));
          }
        if (note.user.toString() !== req.user.id) {
            return next(new ErrorHandler("Note Allowed", 401));
          }
        note = await NotesModel.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "success", note:note });

  } catch (error) {
      
}

};