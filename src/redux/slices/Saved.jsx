import { createSlice } from "@reduxjs/toolkit";

const savedInitialState = {
  value: JSON.parse(localStorage.getItem("saved")) || [],
};

const savedSlice = createSlice({
  name: "saved",
  initialState: savedInitialState,

  reducers: {
    savedMovies(state, action) {
      state.value = action.payload;
      localStorage.setItem("saved", JSON.stringify(state.value));
    },
  },
});

export const { savedMovies } = savedSlice.actions;
export default savedSlice.reducer;
