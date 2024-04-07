/* eslint-disable react-hooks/exhaustive-deps */
import {
  SearchOutlined,
  CloseCircleFilled,
  DownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState, useRef, KeyboardEvent } from "react";
import { useAppDispatch } from "@/redux/store";
import API from "@/libs/api";
import * as Helper from "@/libs/helper";
import { setListBook, setBookNotFound } from "@/redux/slices/bookSlice";
import BookPage from "@/components/BookPage/BookPage";
import { Book } from "@/models/Book";
import { BookListQueryGenre } from "@/models/BookListQueryGenre";
import { Genre } from "@/models/Genre";
import { Pagination } from "antd";
import { getBookListInput } from "@/libs/helper";
import { RootState, useAppSelector } from "@/redux/store";
const DashboardContent = () => {
  const opts: Genre[] = [
    { name: "love", value: "All Genres" },
    { name: "business", value: "Business" },
    { name: "science", value: "Science" },
    { name: "fiction", value: "Fiction" },
    { name: "philosophy", value: "Philosophy" },
    { name: "biography", value: "Biography" },
  ];
  const bookListQuery: BookListQueryGenre = {
    genres: "",
    page: "1",
  };
  let numPageInitial: number = 1;
  let searchInitial: string = "";

  let searchParams = Helper.getSearchParams();
  const pageParam = searchParams.get("page");
  const searchBookNameParam = searchParams.get("search");
  if (searchParams.has("page") && !!pageParam) {
    numPageInitial = Number(pageParam);
  }
  if (searchParams.has("search") && !!searchBookNameParam) {
    searchInitial = searchBookNameParam;
  }
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const searchBookNameRef = useRef<HTMLInputElement>(null);
  const [chooseGenre, setChooseGenre] = useState(opts[0].name);
  const [totalBooks, setTotalBooks] = useState(0);
  const [numPage, setNumPage] = useState(numPageInitial);
  const [searchBookName, setSearchBookName] = useState(searchInitial);
  const [isSearchBookName, setIsSearchBookName] = useState(false);
  const [isHandleCustomEffectGenre, setIsHandleCustomEffectGenre] =
    useState(false);
  const [isHandleCustomEffectPage, setIsHandleCustomEffectPage] =
    useState(false);
  const bookNotFound = useAppSelector(
    (state: RootState) => state.book
  ).bookNotFound;
  useEffect(() => {
    if (searchParams.has("search")) {
      if (!searchBookNameParam) {
        handleSetBookNotFound(true);
      } else {
        getSearchBooks();
      }
    } else {
      fetchBookList(searchParams);
    }
  }, []);

  const fetchBookList = async (searchParams: URLSearchParams) => {
    try {
      const req = getBookListInput(searchParams, bookListQuery);
      const res = await API.app.getListBook(req);
      if (res.data && res.data.work_count > 0) {
        setTotalBooks(res.data.work_count);
        handleSetBookList(res.data.works);
        handleSetBookNotFound(false);
      } else {
        handleSetBookNotFound(true);
      }
    } catch (error) {
      handleSetBookList([]);
      handleSetBookNotFound(true);
    }
  };
  const getSearchBooks = async () => {
    setIsSearchBookName(true);
    let numPageParam = Helper.getSearchParams().get("page");
    if (!searchParams.has("page") || !numPageParam) {
      numPageParam = "1";
    }
    setNumPage(Number(numPageParam));
    const callSearchApi = async () => {
      await searchBookWithName(searchBookName, Number(numPageParam));
    };
    callSearchApi();
  };
  const searchBookWithName = async (bookName: string, pageNum: number) => {
    try {
      const res = await API.app.searchBookName(bookName, pageNum);
      if (res.data && res.data.numFound > 0) {
        setTotalBooks(res.data.numFound);
        handleSetBookList(res.data.docs);
        handleSetBookNotFound(false);
      } else {
        handleSetBookNotFound(true);
      }
    } catch (error) {
      handleSetBookList([]);
      handleSetBookNotFound(true);
    }
  };
  const navigateToGenre = () => {
    bookListQuery.genres = chooseGenre === opts[0].name ? "" : chooseGenre;
    bookListQuery.page = "1";
    const urlNext = Helper.toBookListPage(bookListQuery);
    navigate(urlNext);
  };
  const navigateToSearch = () => {
    const urlNext = `?search=${Helper.transferSearchBookNameData(searchBookName)}`;
    navigate(urlNext);
  };
  const navigateToPage = (pageNum: number) => {
    const urlWithNumberPage = Helper.toUrlParamNumPage(pageNum);
    navigate(urlWithNumberPage);
  };
  useEffect(() => {
    const onChangeGenre = async () => {
      navigateToGenre();
      setNumPage(1);
      searchParams = Helper.getSearchParams();
      await fetchBookList(searchParams);
      setIsHandleCustomEffectGenre(false);
    };
    if (isHandleCustomEffectGenre) onChangeGenre();
  }, [chooseGenre, isHandleCustomEffectGenre]);

  useEffect(() => {
    const onChangePage = async () => {
      navigateToPage(numPage);
      if (searchParams.has("search") && searchBookNameParam) {
        await searchBookWithName(searchBookName, numPage);
      } else {
        bookListQuery.page = numPage.toString();
        searchParams = Helper.getSearchParams();
        await fetchBookList(searchParams);
      }
      setIsHandleCustomEffectPage(false);
    };
    if (isHandleCustomEffectPage) onChangePage();
  }, [numPage, isHandleCustomEffectPage]);

  const handleSetBookList = (bookList: Book[]) => {
    dispatch(setListBook(bookList));
  };
  const handleSetBookNotFound = (status: boolean) => {
    dispatch(setBookNotFound(status));
  };

  const handleChooseGenre = (e: ChangeEvent<HTMLSelectElement>) => {
    const chooseGenreName = e.target.value;
    const genre = opts.find((item) => item.name === chooseGenreName);
    if (genre) {
      setChooseGenre(genre.name);
      setIsHandleCustomEffectGenre(true);
    }
  };
  const handleChangePage = (page: number) => {
    setNumPage(page);
    setIsHandleCustomEffectPage(true);
  };
  const handleInputSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBookName(e.target.value);
  };
  const handleRemoveInputSearchValue = () => {
    setSearchBookName("");
    searchBookNameRef.current?.focus();
  };
  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchNameBook();
    }
  };
  const handleSearchNameBook = () => {
    navigateToSearch();
    getSearchBooks();
  };
  return (
    <section className="w-full bg-[var(--background-content)]">
      <div className="container pt-5 pb-5 w-full">
        <div className="h-[45px] flex justify-between mt-10 mb-2">
          <div className="group relative px-2 flex justify-between w-[350px] h-full  border border-[var(--accent-color)] rounded-[25px] hover:border-[var(--dark-color)]">
            <button type={"button"} onClick={handleSearchNameBook}>
              <SearchOutlined className="ml-3 text-[var(--accent-color)] hover:cursor-pointer group-hover:text-[var(--dark-color)]" />
            </button>
            <input
              className="h-full px-1 flex-1 outline-none bg-transparent"
              ref={searchBookNameRef}
              value={searchBookName}
              onChange={handleInputSearchValue}
              onKeyDown={handleEnterKey}
              type={"text"}
            />
            {searchBookName && (
              <button
                onClick={handleRemoveInputSearchValue}
                className="mr-3 text-[var(--accent-color)] group-hover:text-[var(--dark-color)]"
              >
                <CloseCircleFilled />
              </button>
            )}
          </div>
          {!isSearchBookName && (
            <div className="flex items-center">
              <h2 className="h-fit font-bold pr-3">Genres</h2>
              <div className="relative group w-[150px] h-full">
                <select
                  name="select-genre"
                  id="select-genre"
                  value={chooseGenre}
                  onChange={handleChooseGenre}
                  className="appearance-none outline-none px-5 w-full h-full bg-transparent border border-[var(--accent-color)] rounded-[25px] group-hover:border-[var(--dark-color)] group-hover:cursor-pointer"
                >
                  {opts.map((item: Genre, index: number) => (
                    <option
                      className="min-h-[4.6rem] bg-[var(--background-content)] hover:bg-gray-200"
                      key={index}
                      value={item.name}
                    >
                      {item.value}
                    </option>
                  ))}
                </select>
                <DownOutlined className="absolute text-[var(--accent-color)] pointer-events-none right-0 pr-3 top-1/2 transform -translate-y-1/2 group-hover:text-[var(--dark-color)]" />
              </div>
            </div>
          )}
        </div>
        <span className="block w-full border-t opacity-70 border-[var(--accent-color)] "></span>
      </div>
      <div className="container">
        <BookPage />
        {!bookNotFound && (
          <div className="w-full flex justify-center pb-10">
            <Pagination
              className="w-fit"
              current={numPage}
              defaultCurrent={numPageInitial}
              total={totalBooks}
              pageSize={12}
              defaultPageSize={12}
              showSizeChanger={false}
              onChange={handleChangePage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardContent;
