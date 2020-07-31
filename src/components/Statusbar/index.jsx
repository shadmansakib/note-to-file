import React, {useContext} from 'react'
import './style.css'

import { GlobalContext } from "../../context/globalState";


export default function ResultArea() {
    const {notes} = useContext(GlobalContext);
    return (
        <div className="Statusbar">
            <p><code>Total {notes.length} {notes.length > 1 ? "notes" : "note"}</code></p>
        </div>
    );
}
