import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface LoadingState {
  initialState: boolean;
}
const initialState: LoadingState = {
  initialState: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.initialState = action.payload;
    },
  },
});
export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
