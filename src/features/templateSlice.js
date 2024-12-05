import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  templates: [],
};

const templateSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    addTemplate: (state, action) => {
      console.log({ new: true, state, action });
      state.templates.push({ ...action.payload, id: Date.now() });
    },
    updateTemplate: (state, action) => {
      console.log({ new: false, state, action });
      const index = state.templates.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) state.templates[index] = action.payload;
    },
    deleteTemplate: (state, action) => {
      state.templates = state.templates.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTemplate, updateTemplate, deleteTemplate } =
  templateSlice.actions;

export const selectTemplates = (state) => state.templates.templates;

export default templateSlice.reducer;
