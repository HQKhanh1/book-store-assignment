/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import * as Helper from "@/libs/helper";
import { BookDetail } from "@/models/BookDetail";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  apiGetBookItemDetail,
  apiSearchAuthorName,
} from "@/redux/slices/bookSlice";
const BookItemDetail: React.FC = () => {
  const params = useParams();
  const bookWorkId = params.keys?.toString();
  const searchParams = Helper.getSearchParams();
  const authorParam = searchParams.has("author")
    ? searchParams.get("author")
    : null;
  const bookItemDetail = useAppSelector(
    (state: RootState) => state.book.bookDetail
  );

  const dispatch = useAppDispatch();
  const defaultImage = "/images/default_book_image.webp";
  const authorDetail = useAppSelector(
    (state: RootState) => state.book.authorDetail
  );
  useEffect(() => {
    if (bookWorkId) {
      dispatch(apiGetBookItemDetail(bookWorkId));
      if (authorParam) {
        dispatch(apiSearchAuthorName(authorParam));
      }
    }
  }, []);
  const getImageCover = (bookItemDetail: BookDetail): string => {
    const bookCoverId = bookItemDetail.covers ? bookItemDetail.covers[0] : null;
    return bookCoverId
      ? `${import.meta.env.VITE_COVER_API}/id/${bookCoverId}-L.jpg`
      : defaultImage;
  };
  const getCreatedDate = (bookItemDetail: BookDetail): string => {
    return bookItemDetail.created &&
      typeof bookItemDetail.created.value === "string"
      ? new Date(bookItemDetail.created.value).getFullYear().toString()
      : "";
  };
  const getPlaces = (bookItemDetail: BookDetail): string => {
    if (bookItemDetail.subject_places) {
      const places = bookItemDetail.subject_places.reduce(
        (item, current, index) => {
          item += current;
          if (index < bookItemDetail.subject_places.length - 1) {
            item += ",";
          }
          return item;
        },
        ""
      );
      return places;
    } else {
      return "unknown";
    }
  };
  const getDescription = (bookItemDetail: BookDetail): string => {
    if (bookItemDetail.description) {
      if (typeof bookItemDetail.description === "string") {
        return bookItemDetail.description;
      } else {
        return bookItemDetail.description.value;
      }
    } else {
      return "";
    }
  };
  return (
    !!bookItemDetail.key && (
      <div className="container pt-[150px] px-24 pb-10">
        <div className="flex flex-row justify-start gap-10">
          <img
            loading="lazy"
            src={getImageCover(bookItemDetail)}
            className="w-[var(--book-item-detail-image-width)] h-[var(--book-item-detail-image-height)] object-cover"
            alt="book cover"
          />
          <div className="w-fit">
            <div className="flex flex-col">
              <h1 className="text-[48px] font-semibold">
                {bookItemDetail.title}
              </h1>
              <div className="grid grid-cols-auto-2 gap-3 items-start">
                <h6 className="mt-[0.3rem]">By:</h6>
                <h4 className="text-[17px] font-semibold">
                  {authorDetail.name === "" ? "unknown" : authorDetail.name}
                </h4>
                <h6 className="mt-[0.3rem]">Since:</h6>
                <h4 className="text-[17px] font-semibold">
                  {getCreatedDate(bookItemDetail)}
                </h4>
                <h6 className="mt-[0.3rem]">Place:</h6>
                <h4 className="text-[17px] font-semibold">
                  {getPlaces(bookItemDetail)}
                </h4>
              </div>
            </div>
            <div className="mt-10">
              <p className="text-[12px] w-[var(--book-item-description-width)]">
                {getDescription(bookItemDetail)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default BookItemDetail;
