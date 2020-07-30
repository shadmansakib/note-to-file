
import { ADD_NOTE, DELETE_NOTE, SEARCH_NOTE, UPDATE_NOTE_LIST } from "./globalState";

export default function noteReducer(state, action) {
    switch (action.type) {
        case ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, action.payload],
            };

        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload),
            };

        case SEARCH_NOTE:
            return {
                ...state,
                searchQuery: action.payload,
            };

        case UPDATE_NOTE_LIST:
            return {
                ...state,
                notes: action.payload,
            };

        default:
            return state;
    }
};



