import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: string = "";
const trinerSlice = createSlice({
  name: "trainer",
  initialState: INITIAL_STATE,
  reducers: {
    setTrainerGlobal: (state, action) => action.payload,
  },
});

export const { setTrainerGlobal } = trinerSlice.actions;
export default trinerSlice.reducer;
