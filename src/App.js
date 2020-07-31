import React, { useState, useContext, useEffect } from 'react';
import './App.css';

// components
import Search from "./components/Search";
import ResultArea from "./components/ResultArea";
import Statusbar from "./components/Statusbar";
import DragAndDrop from "./components/DragAndDrop";
import FileDrop from "./components/FileDrop";

import NewNote from "./components/NewNote";
import EmptyNoteList from "./components/EmptyNoteList";

// context
import { GlobalContext } from './context/globalState';

import { MULTIPLE_FILE_SELECTED_ERROR, SAVE_NOTE, UPDATE_NOTE_LIST } from "./consts";


// electron
const { ipcRenderer } = window.require('electron');

function App() {

  const [hasNewFilePath, setHasNewFilePath] = useState(false);
  const [filePath, setFilepath] = useState('');

  const { notes, updateNoteList } = useContext(GlobalContext);

  useEffect(() => {
    ipcRenderer.send(UPDATE_NOTE_LIST);
  }, []);


  const saveNote = (note) => {
    ipcRenderer.send(SAVE_NOTE, note);
  };


  ipcRenderer.on(UPDATE_NOTE_LIST, (event, notes) => {
    console.log('updating note list');
    updateNoteList(notes);
  });

  
  function handleDrop(files) {
    let fileLength = files.length;
    if (fileLength > 1) {
      ipcRenderer.send(MULTIPLE_FILE_SELECTED_ERROR);
      return;
    }
    if (!files[0].name) return;
    setFilepath(files[0].path);
    setHasNewFilePath(true);
  }

  function toggleScreen() {
    setHasNewFilePath(prevState => !prevState);
  }

  return (
    <div className="App">
      <DragAndDrop handleDrop={handleDrop} dropScreen={<FileDrop />}>
        {notes.length === 0 && !hasNewFilePath && <EmptyNoteList />}

        {notes.length > 0 && !hasNewFilePath && <>
          <Search />
          <ResultArea />
        </>}
      </DragAndDrop>

      {hasNewFilePath && <NewNote file_path={filePath} toggleScreen={toggleScreen} onSaveNote={saveNote} />}

      <Statusbar />
    </div>
  );
}

export default App;
