
import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title: {
    type: String,
    required: [true, "please enter a Title"],
  },
  description: {
    type: String,
    required: [true, "Please enter Description"],
  },
  tag: {
    type: String,
    default:"General"
  },
  date:{
    type : Date ,
    default : Date.now()
  }
  
});

const Notes = mongoose.model("Notes", NotesSchema);
export default Notes;
