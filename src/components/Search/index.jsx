import React, { useContext, useEffect } from 'react'
import './style.css'

import { GlobalContext } from "../../context/globalState";

export default function Search() {

    const { searchNotes } = useContext(GlobalContext);

    useEffect(() => {
        searchNotes('');
    }, []);


    return (
        <header className="App-header">
            <input
                className="Search-input"
                type="text"
                name="search"
                placeholder="Search notes"
                autoFocus
                onChange={(e) => searchNotes(e.target.value)}
            />
        </header>
    );
}
