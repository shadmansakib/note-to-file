import React, {useContext} from 'react'
import './style.css'

import { GlobalContext } from "../../context/globalState";


export default function ResultArea() {
    const {notes} = useContext(GlobalContext);
    return (
        <div className="Statusbar">
            <p><code>Total {notes.length} tags</code></p>
        </div>
    );
}
