import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("notes");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error("error fetching from localstorage", e);
    return [];
  }
};

const saveToLocalStorage = (notes) => {
  try {
    const serializedState = JSON.stringify(notes);
    localStorage.setItem("notes", serializedState);
  } catch (e) {
    console.error("error saving to localstorage", e);
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
  },
});

export const { addNote } = notesSlice.actions;

export const selectNotes = (state) => state.notes.notes;

export default notesSlice.reducer;
