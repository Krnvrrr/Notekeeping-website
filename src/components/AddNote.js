import React, {useContext, useState} from 'react'
import noteContext from '../context/notecontext';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({Title: "", discription: "", tag: "default"})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.Title, note.discription, note.tag);
        // setNote({Title: "", discription: "", tag: ""})
    }

    const onChange = (e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="Title" name="Title" aria-describedby="emailHelp" value={note.Title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="discription" className="form-label">discription</label>
                    <input type="text" className="form-control" id="discription" name="discription" value={note.discription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>
               
                <button disabled={note.Title.length<5 || note.discription.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote