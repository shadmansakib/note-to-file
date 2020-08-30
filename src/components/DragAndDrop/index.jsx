import React, { useState, useEffect, useRef } from 'react'

export default function DragAndDrop(props) {
    let dragCounter = 0;

    const dropRef = useRef();

    const [drag, setDrag] = useState(false);


    // event listeners
    function handleDrag(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    function handleDragIn(e) {
        e.preventDefault();
        e.stopPropagation();

        dragCounter++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDrag(true);
        }
    };

    function handleDragOut(e) {
        e.preventDefault();
        e.stopPropagation();

        dragCounter--;
        if (dragCounter === 0) {
            setDrag(false);
        }
        setDrag(false);
    };

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        setDrag(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            props.handleDrop(e.dataTransfer.files);
            e.dataTransfer.clearData();
            dragCounter = 0;
        }
    };

    useEffect(() => {
        let div = dropRef.current;

        div.addEventListener('dragenter', handleDragIn);
        div.addEventListener('dragleave', handleDragOut);
        div.addEventListener('dragover', handleDrag);
        div.addEventListener('drop', handleDrop);

        return () => {
            div.removeEventListener('dragleave', handleDragOut);
            div.removeEventListener('dragenter', handleDragIn);
            div.removeEventListener('dragover', handleDrag);
            div.removeEventListener('drop', handleDrop);
        }
    }, []);



    return (
        <div ref={dropRef}>
            {drag ? props.dropScreen : props.children}
        </div>
    );
}
