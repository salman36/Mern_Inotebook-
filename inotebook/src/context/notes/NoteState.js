// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./NoteConext";
import axios from "axios";

const NoteState = (props) => {
    const host = "http://localhost:8000/api/auth";
    // const s1 = {
    //     "name": "suleman",
    //     "class": "MS"
    // };
    
    //  const [state, setState] = useState(s1);
    // const update = () =>{
    //     setTimeout(() => {
    //         setState({
    //             "name": "khan",
    //             "class": "Computer"
    //         })
    //     }, 1000);
    //  }

    // const notesInitial = []

    const [notes,setNotes] = useState([]);

    //''''''''''''''''''''' Get a Notes ''''''''''''''''''''''//
    const getNotes = async ()=>{
        try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${host}/notes/all`,{
           headers:{
               'Content-Type':'application/json',
               'Authorization': `${token}`
               },
           });
           const json = await response.data;
             setNotes(json.notes);

           } catch (error) {
               console.error('Error:', error); 
           }

   }


    //''''''''''''''''''''' Add a Notes ''''''''''''''''''''''//
    const addNote = async (title,description,tag)=>{
         try {
         const token = localStorage.getItem('token');
         const response = await fetch(`${host}/notes/store`,{
            method:'POST',
            headers:{
                'Authorization': `${token}`,
                'Content-Type':'application/json'
                },
                body:JSON.stringify({title,description,tag})
            });

            const data = await response.json();
            if (data.message === "success") {
                // API call was successful, handle success case
                console.log('API call successful:', data);
                // Ensure that the data contains a unique identifier (e.g., _id)
                    if (data.saveNotes && data.saveNotes._id) {
                        // Update the state using the unique identifier as the key
                        setNotes(prevNotes => [...prevNotes, data.saveNotes]);
                    } else {
                        console.error('API response is missing the unique identifier (key).');
                    }
            } else {
                // API call failed, handle error case
                console.error('API call failed:', data.error);
            }

            } catch (error) {
                console.error('Error:', error); // Log any errors during the fetch
            }
    }
    //''''''''''''''''''''' Delete a Notes ''''''''''''''''''''''//
    const deleteNote = async(id)=>{
        try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${host}/notes/delete/${id}`,{
                    method:'DELETE',
                    headers:{
                        'Authorization': `${token}`,
                        'Content-Type':'application/json'
                        }
                });

                const json = response.json();
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
                
                if (!response.ok){throw new Error("HTTP error " + response.status)};    
                return json;

            } catch (error) {
                console.error('Error:', error); // Log any errors during the fetch
            }
    }
    //''''''''''''''''''''' Edit a Notes ''''''''''''''''''''''//
    const editNote = async (id,title,description,tag)=>{
        try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${host}/notes/update/${id}`,{
                    method:'PUT',
                    headers:{
                        'Authorization': `${token}`,
                        'Content-Type':'application/json',
                        },
                        body:JSON.stringify({title,description,tag})
                    });
                        const json = await response.json();
                        console.log(json);
                        // Create a new array with the updated note
                        const updatedNotes = notes.map((note) =>
                        note._id === id ? { ...note, title, description, tag } : note
                        );
                        setNotes(updatedNotes);
            } catch (error) {
                console.error('Error:', error); // Log any errors during the fetch
              }
    }

    return (
        <NoteContext.Provider value={{notes,setNotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;