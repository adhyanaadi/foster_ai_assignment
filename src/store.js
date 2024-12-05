import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "@/features/templateSlice";
import notesReducer from "@/features/notesSlice";

export const store = configureStore({
  reducer: {
    templates: templateReducer,
    notes: notesReducer,
  },
});
