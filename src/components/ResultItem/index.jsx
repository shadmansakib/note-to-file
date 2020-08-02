import React, { useContext } from 'react'
import './style.css'

import { GlobalContext } from "../../context/globalState";

const { ipcRenderer } = window.require('electron');

export default function ResultItem({ id, note, fpath }) {

    const { deleteNote } = useContext(GlobalContext);

    const deleteNoteHandler = (id) => {
        ipcRenderer.send('delete-note', id);
        deleteNote(id);
    };

    const showFileInExplorer = filepath => {
        // console.log(`>>> filepath: ${filepath}`);
        ipcRenderer.send('open-file-path', filepath);
    };

    return (
        <div className="Result-item">

            < div className="Note-name" onClick={_ => showFileInExplorer(fpath)} >
                <p>{note}</p>
            </div>

            <div className="File-path">
                {/* remove space from filepath. reason: sometimes space breaks the design :-/ */}
                <p>{fpath.replace(/\s/g, '')}</p>
            </div>

            <div className="Delete" onClick={() => deleteNoteHandler(id)}>
                <p>Delete</p>
            </div>
        </div >
    );
}
