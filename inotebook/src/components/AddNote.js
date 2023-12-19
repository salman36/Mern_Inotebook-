import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteConext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const  [note,setNote] = useState({title:"",description:"",tag:""});

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});

      
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value});
    }

  return (
    <div className='container-my-3' style={{marginTop: "20px"}}>
        <form>
            <legend>Add A Notes Here</legend>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Note Title</label>
              <input type="text" className="form-control" id="title" name='title' value={note.title} onChange={onChange}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Note Description</label>
              <input type="text" id="description" name='description' value={note.description} className="form-control" onChange={onChange}></input>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" id="tag" name='tag' className="form-control" value={note.tag} onChange={onChange}></input>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
    </div>
  )
}

export default AddNote
