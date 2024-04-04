import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface BooksState {
  bookList: Book[];
}
const initialState: BooksState = {
  bookList: [],
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setListBook: (state, action: PayloadAction<Book[]>) => {
      state.bookList = action.payload;
    },
  },
});
export const { setListBook } = bookSlice.actions;

export default bookSlice.reducer;
