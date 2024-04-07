import { Book } from "@/models/Book";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface BooksState {
  bookList: Book[];
  bookNotFound: boolean;
}
const initialState: BooksState = {
  bookList: [],
  bookNotFound: false,
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setListBook: (state, action: PayloadAction<Book[]>) => {
      state.bookList = action.payload;
    },
    setBookNotFound: (state, action: PayloadAction<boolean>) => {
      state.bookNotFound = action.payload;
    },
  },
});
export const { setListBook, setBookNotFound } = bookSlice.actions;

export default bookSlice.reducer;
