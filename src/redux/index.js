import { configureStore } from "@reduxjs/toolkit";
import saved from "./slices/Saved.jsx";
const store = configureStore({
  reducer: { saved },
});

export default store;
