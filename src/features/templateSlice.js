import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("templates");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error("error fetching from localstorage", e);
    return [];
  }
};

const saveToLocalStorage = (templates) => {
  try {
    const serializedState = JSON.stringify(templates);
    localStorage.setItem("templates", serializedState);
  } catch (e) {
    console.error("error saving to localstorage", e);
  }
};

const initialState = {
  // sync store with localstorage
  templates: loadFromLocalStorage(),
};

const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    addTemplate: (state, action) => {
      const newTemplate = { ...action.payload, id: uuidv4() };
      state.templates.push(newTemplate);
      saveToLocalStorage(state.templates);
    },
    updateTemplate: (state, action) => {
      const index = state.templates.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) state.templates[index] = action.payload;
      saveToLocalStorage(state.templates);
    },
    deleteTemplate: (state, action) => {
      state.templates = state.templates.filter((t) => t.id !== action.payload);
      saveToLocalStorage(state.templates);
    },
  },
});

export const { addTemplate, updateTemplate, deleteTemplate } =
  templateSlice.actions;

export const selectTemplates = (state) => state.templates.templates;

export default templateSlice.reducer;
