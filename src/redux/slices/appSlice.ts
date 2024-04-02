// Don't add any asynchronous logic or other "side effects" in reducer
// For example, logging a value to the console, ajax
// Just keep it simple
import { createSlice } from "@reduxjs/toolkit";
interface AppState {
  initialState: boolean;
}
const initialState: AppState = {
  initialState: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state) => {
      state.initialState = true;
    },
  },
});
export const { login } = appSlice.actions;

export default appSlice.reducer;
