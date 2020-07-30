import React, { useState, useContext } from 'react';
import './style.css';

import { HotKeys } from "react-hotkeys";
import { GlobalContext } from '../../context/globalState';

export default function NewNote({ file_path = "", toggleScreen, onSaveNote }) {
    const keyMap = {
        DISCARD_NOTE: 'Escape',
    };

    const [filepath, setFilePath] = useState(file_path);
    const [note, setNote] = useState('');

    const { addNote } = useContext(GlobalContext);

    const handleSubmit = e => {
        e.preventDefault();
        onSaveNote({ filepath, note });
        toggleScreen();
    };

    return (
        <HotKeys
            keyMap={keyMap}
            handlers={{ DISCARD_NOTE: toggleScreen }}>
            <div className="New-note">
                <h1>Add a new note</h1>
                <form className="New-note-form" onSubmit={handleSubmit}>
                    <input className="Form-input Filepath" type="text" name="filepath" placeholder="File path" value={filepath} onChange={(e) => setFilePath(e.target.value)} required />
                    <textarea className="Form-input Note" name="note" placeholder="Add note" value={note} onChange={(e) => setNote(e.target.value)} required autoFocus />
                    <div className="Button-area">
                        <button className="Form-btn" type="submit">Save</button>
                        <button className="Form-btn" onClick={toggleScreen}>Discard</button>
                    </div>
                </form>
            </div>
        </HotKeys>
    );
}
