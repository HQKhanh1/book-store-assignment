/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { apiGetBooksList, apiSearchBookName } from "@/redux/slices/bookSlice";
import * as Helper from "@/libs/helper";
import DashboardContent from "@/components/DashboardContent/DashboardContent";
import { Genre } from "@/models/Genre";
import DashboardTop from "@/components/DashboardTop/DashboardTop";
import { BookListQueryGenre } from "@/models/BookListQueryGenre";

const Dashboard: React.FC = () => {
  const opts: Genre[] = [
    { name: "love", value: "All Genres" },
    { name: "business", value: "Business" },
    { name: "science", value: "Science" },
    { name: "fiction", value: "Fiction" },
    { name: "philosophy", value: "Philosophy" },
    { name: "biography", value: "Biography" },
  ];

  const totalBooks = useAppSelector(
    (state: RootState) => state.book.totalBooks
  );

  let pageParamInitial: number = 1;
  let searchBookNameParamInitial: string | null = "";
  const searchParams = Helper.getSearchParams();
  if (searchParams.has("page") && !!searchParams.get("page")) {
    pageParamInitial = Number(searchParams.get("page"));
  }
  if (searchParams.has("search") && !!searchParams.get("search")) {
    searchBookNameParamInitial = searchParams.get("search") || "";
  }
  const [numPage, setNumPage] = useState(pageParamInitial);
  const [searchBookName, setSearchBookName] = useState(
    searchBookNameParamInitial
  );
  const [isCurrentRemove, setIsCurrentRemove] = useState(false);
  const [isSearchBookName, setIsSearchBookName] = useState(false);
  const [chooseGenre, setChooseGenre] = useState(opts[0]);
  const bookListQuery: BookListQueryGenre = {
    genres: "",
    page: "1",
  };
  const bookNotFound = useAppSelector(
    (state: RootState) => state.book
  ).bookNotFound;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = () => {
      if (searchBookName) {
        setIsCurrentRemove(false);
        getSearchBooks();
      } else if (!isCurrentRemove) {
        fetchBookList();
      }
    };
    fetchData();
  }, [numPage, searchBookName, chooseGenre]);

  const fetchBookList = () => {
    const req = Helper.getBookListInput(
      Helper.getSearchParams(),
      bookListQuery
    );
    dispatch(apiGetBooksList(req));
  };

  const getSearchBooks = async () => {
    setIsSearchBookName(true);
    const searchBookNameReq = {
      searchBookName,
      numPage,
    };
    dispatch(apiSearchBookName(searchBookNameReq));
  };

  const handleChangePage = (page: number) => {
    navigateToPage(page);
    setNumPage(page);
    setIsSearchBookName(false);
  };

  const handleSearchBookName = (searchBookName: string) => {
    if (searchBookName) {
      setSearchBookName(searchBookName);
      setNumPage(1);
      navigate(`?search=${Helper.transferSearchBookNameData(searchBookName)}`);
    }
  };
  const handleRemoveInputSearchValue = () => {
    setSearchBookName("");
    setIsCurrentRemove(true);
  };
  const handleChooseGenreChange = (genre: Genre) => {
    navigateToGenre(genre);
    setChooseGenre(genre);
  };
  const navigateToPage = (pageNum: number) => {
    const urlWithNumberPage = Helper.toUrlParamNumPage(pageNum);
    navigate(urlWithNumberPage);
  };
  const navigateToGenre = (genre: Genre) => {
    if (!(genre.name === opts[0].name)) {
      bookListQuery.genres = genre.name;
      bookListQuery.page = "1";
    } else {
      bookListQuery.genres = "";
      bookListQuery.page = "1";
    }
    const urlNext = Helper.toBookListPage(bookListQuery);
    navigate(urlNext);
  };

  return (
    <>
      <DashboardTop />
      <DashboardContent
        opts={opts}
        totalBooks={totalBooks}
        numPage={numPage}
        searchBookName={searchBookName}
        isSearchBookName={isSearchBookName}
        chooseGenre={chooseGenre}
        bookNotFound={bookNotFound}
        handleChangePage={handleChangePage}
        handleSearchBookName={handleSearchBookName}
        handleRemoveInputSearchValue={handleRemoveInputSearchValue}
        handleChooseGenreChange={handleChooseGenreChange}
      />
    </>
  );
};

export default Dashboard;
