import React from 'react'
import './style.css'



export default function EmptyNoteList() {
    return (
        <div className="Empty-note-list">
            <h1>No notes found!</h1>
            <p>To add a new note, drag and drop any file here.</p>
        </div>
    );
}
