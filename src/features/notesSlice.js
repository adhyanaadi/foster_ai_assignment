import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("notes");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error("Error loading from localStorage", e);
    return [];
  }
};

const saveToLocalStorage = (notes) => {
  try {
    const serializedState = JSON.stringify(notes);
    localStorage.setItem("notes", serializedState);
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
};

const initialState = {
  notes: loadFromLocalStorage(),
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = { ...action.payload, id: uuidv4() };
      state.notes.push(newNote);
      saveToLocalStorage(state.notes);
    },
    updateNote: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
        saveToLocalStorage(state.notes);
      }
    },
  },
});

export const { addNote, updateNote } = notesSlice.actions;

export const selectNotes = (state) => state.notes.notes;

export default notesSlice.reducer;
