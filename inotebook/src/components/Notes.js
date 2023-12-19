import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteConext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';


const Notes = () => {

    const context = useContext(NoteContext);
    const {notes,getNotes, editNote} = context;
    useEffect(()=>{
        getNotes();
        //eslint-disable-next-line
    },[]);

    const ref = useRef(null)
    const refClose = useRef(null)
    const  [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""});

    const updateNote = (currentNote) =>{
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});

    }

    const handleClick = (e)=>{
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        // getNotes();

        // addNote(note.title,note.description,note.tag);
    }
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value});
    }

  return (
        <> 
            <AddNote />

            <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">Note Title</label>
                            <input type="text" className="form-control" id="etitle" value={note.etitle} name='etitle' onChange={onChange}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edescription" className="form-label">Note Description</label>
                            <input type="text" id="edescription" name='edescription' value={note.edescription} className="form-control" onChange={onChange}></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="etag" className="form-label">Tag</label>
                            <input type="text" id="etag" name='etag' value={note.etag} className="form-control" onChange={onChange}></input>
                        </div>
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className='container row my-3'>
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'There is no Notes to display'}
                </div>
                {notes.map((note)=>{
                    return <NoteItem key={note._id} updateNote={updateNote} note={note}/>
                })}
            
            </div>
        </>

    )
}

export default Notes
