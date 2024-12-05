import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "@/features/templateSlice";

export const store = configureStore({
  reducer: {
    templates: templateReducer,
  },
});
