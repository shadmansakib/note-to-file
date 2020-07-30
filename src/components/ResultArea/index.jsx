import React from 'react'
import './style.css'

import ResultList from "../ResultList";

export default function ResultArea() {
    return (
        <div className="Result-area">
            <ResultList />
            {/* <ResultPreview /> */}
        </div>
    );
}
