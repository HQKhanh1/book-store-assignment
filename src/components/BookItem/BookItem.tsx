import { Book } from "@/models/Book";
import { ShareAltOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
type Props = {
  bookItem: Book;
};
const BookItem: React.FC<Props> = ({ bookItem }) => {
  const defaultImage = "/src/assets/images/default_book_image.webp";
  const bookCoverId = bookItem.cover_id ?? bookItem.cover_i;
  const imageUrl = bookCoverId
    ? `${import.meta.env.VITE_COVER_API}/id/${bookCoverId}-L.jpg`
    : defaultImage;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <div className="relative w-[var(--book-item-width)]">
      <div className="group p-[15%] w-full bg-[var(--book-item-background-color)] hover:cursor-pointer relative">
        <div className="w-full h-full absolute top-0 left-0 bg-[var(--book-item-background-wrapper-color)] opacity-0 group-hover:opacity-100"></div>
        <div className="relative inline-block w-full h-[var(--book-item-image-height)]">
          {!imageLoaded && (
            <div className="absolute inset-0 flex justify-center items-center">
              <LoadingOutlined className="text-[48px] font-[900px] text-yellow-400 animate-spin" />
            </div>
          )}
          <img
            loading="lazy"
            className="static shadow-2xl w-full h-full object-cover"
            src={imageUrl}
            alt="book-page"
            onLoad={handleImageLoad}
          />
        </div>
        <button className="absolute bg-[var(--book-item-share-background-color)] top-0 right-0 p-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ShareAltOutlined className="text-[35px] text-[var(--accent-color)]" />
        </button>
      </div>

      <div className="flex flex-col items-center pt-1">
        <h2 className="text-center text-[22px] font-bold">{bookItem.title}</h2>
        <div className="flex items-center opacity-75">
          <span className="text-[12px] mr-1">by</span>
          <h4>
            {bookItem.authors
              ? bookItem.authors[0].name
              : bookItem.author_name
                ? bookItem.author_name[0]
                : ""}
          </h4>
        </div>
        <label className="text-[10px]">
          since{" "}
          <span className="text-black font-bold">
            {bookItem.first_publish_year}
          </span>
        </label>
      </div>
    </div>
  );
};

export default BookItem;
