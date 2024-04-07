import BookItem from "../BookItem/BookItem";

import { RootState, useAppSelector } from "@/redux/store";

const BookPage: React.FC = () => {
  const bookList = useAppSelector((state: RootState) => state.book).bookList;
  const bookNotFound = useAppSelector(
    (state: RootState) => state.book
  ).bookNotFound;

  return (
    <div className="flex flex-row flex-wrap justify-around gap-x-24 gap-y-10 py-5">
      {!bookNotFound &&
        bookList.map((item) => <BookItem key={item.key} bookItem={item} />)}
      {bookNotFound && <div>no data display</div>}
    </div>
  );
};

export default BookPage;
