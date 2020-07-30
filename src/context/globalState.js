import React, { createContext, useReducer } from 'react';
import noteReducer from './noteReducer';

// Action types
export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export const SEARCH_NOTE = 'SEARCH_NOTE';


export const UPDATE_NOTE_LIST = 'UPDATE_NOTE_LIST';

// load notes from database (when app started and when new  added/removed)
// export const LOAD_NOTES = 'LOAD_NOTES';

const initialState = {
    notes: [],
    searchQuery: '',
    // isDatabaseChanged: false,
    // unsavedNote: null,
};

// global context
export const GlobalContext = createContext(initialState);


// provider component
export const GlobalProvider = ({ children }) => {

    // reducers
    const [state, dispatch] = useReducer(noteReducer, initialState);

    // Actions
    const addNote = (note) => {
        dispatch({
            type: ADD_NOTE,
            payload: note,
        })
    };

    const deleteNote = (noteId) => {
        dispatch({
            type: DELETE_NOTE,
            payload: noteId,
        })
    };

    const searchNotes = (query) => {
        dispatch({
            type: SEARCH_NOTE,
            payload: query,
        })
    };

    const updateNoteList = (notes) => {
        dispatch({
            type: UPDATE_NOTE_LIST,
            payload: notes,
        })
    };



    return (
        <GlobalContext.Provider value={{
            notes: state.notes,
            searchQuery: state.searchQuery,

            // actions
            addNote,
            deleteNote,
            searchNotes,
            updateNoteList,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};




