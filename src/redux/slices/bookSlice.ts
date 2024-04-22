/* eslint-disable @typescript-eslint/no-unused-vars */
import API from "@/libs/api";
import { Author } from "@/models/Author";
import { Book } from "@/models/Book";
import { BookDetail } from "@/models/BookDetail";
import { BookListQueryGenre } from "@/models/BookListQueryGenre";
import { SearchBookNameReq } from "@/models/SearchBookNameReq";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface BooksState {
  bookList: Book[];
  totalBooks: number;
  bookNotFound: boolean;
  authorDetail: Author;
  bookDetail: BookDetail;
}

const initialBookDetail: BookDetail = {
  description: {
    type: "",
    value: "",
  },
  title: "",
  covers: [],
  subject_places: [],
  subjects: [],
  subject_people: [],
  key: "",
  latest_revision: 0,
  revision: 0,
  created: {
    type: "",
    value: "",
  },
};

const initialAuthorDetail: Author = {
  key: "",
  name: "",
};
const initialState: BooksState = {
  bookList: [],
  totalBooks: 0,
  bookNotFound: false,
  authorDetail: initialAuthorDetail,
  bookDetail: initialBookDetail,
};
export const apiGetBooksList = createAsyncThunk(
  "books/apiGetBooksList",
  async (data: BookListQueryGenre, thunkAPI) => {
    const res = await API.app.getListBook(data);
    return res.data;
  }
);
export const apiSearchBookName = createAsyncThunk(
  "books/apiSearchBookName",
  async (data: SearchBookNameReq, thunkAPI) => {
    const res = await API.app.searchBookName(data);
    return res.data;
  }
);
export const apiSearchAuthorName = createAsyncThunk(
  "books/apiSearchAuthorName",
  async (data: string, thunkAPI) => {
    const res = await API.app.searchAuthorName(data);
    return res.data;
  }
);
export const apiGetBookItemDetail = createAsyncThunk(
  "books/apiGetBookItemDetail",
  async (data: string, thunkAPI) => {
    const res = await API.app.getBookItemDetail(data);
    return res.data;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(apiGetBooksList.fulfilled, (state, action) => {
        if (action.payload && action.payload.work_count > 0) {
          state.bookList = action.payload.works;
          state.totalBooks = action.payload.work_count;
          state.bookNotFound = false;
        } else {
          state.bookNotFound = true;
        }
      })
      .addCase(apiGetBooksList.rejected, (state) => {
        state.bookNotFound = true;
      })
      .addCase(apiSearchBookName.fulfilled, (state, action) => {
        if (action.payload && action.payload.numFound > 0) {
          state.bookList = action.payload.docs;
          state.totalBooks = action.payload.numFound;
          state.bookNotFound = false;
        } else {
          state.bookNotFound = true;
        }
      })
      .addCase(apiSearchBookName.rejected, (state) => {
        state.bookNotFound = true;
      })
      .addCase(apiSearchAuthorName.fulfilled, (state, action) => {
        const authorDetailRes = action.payload.docs[0];
        state.authorDetail = {
          key: authorDetailRes.author_key,
          name: authorDetailRes.author_name,
        };
      })
      .addCase(apiGetBookItemDetail.fulfilled, (state, action) => {
        state.bookDetail = action.payload;
      });
  },
});
export const { setListBook, setBookNotFound } = bookSlice.actions;

export default bookSlice.reducer;
