import BookItem from "../BookItem/BookItem";

import { RootState, useAppSelector } from "@/redux/store";

const BookPage: React.FC = () => {
  const bookList = useAppSelector((state: RootState) => state.book).bookList;

  return (
    <div className="flex flex-row flex-wrap justify-start gap-x-3 gap-y-10 py-5">
      {bookList.map((item) => (
        <BookItem key={item.key} bookItem={item} />
      ))}
    </div>
  );
};

export default BookPage;
