import React, { useContext } from 'react'
import './style.css'

import ResultItem from "../ResultItem";

import { GlobalContext } from "../../context/globalState";


export default function ResultList() {
    const { notes, searchQuery } = useContext(GlobalContext);

 
    const renderNotes = notes.filter(noteItem => noteItem.note.toLowerCase().search(searchQuery.toLowerCase()) > -1)
        .map(note => (<ResultItem
            key={note.id}
            id={note.id}
            note={note.note} fpath={note.filepath}
        />));

    return (
        <div className="Result-list">
            {renderNotes}
        </div>
    );
}
