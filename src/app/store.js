import { configureStore } from "@reduxjs/toolkit";
import resturantSlice from "../features/resturantSlice";
export const store = configureStore({
  reducer: {
    resturantSlice,
  },
});
