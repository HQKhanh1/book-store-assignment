import {
  SearchOutlined,
  CloseCircleFilled,
  DownOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import API from "@/libs/api";
import * as Helper from "@/libs/helper";
import { setListBook } from "@/redux/slices/bookSlice";
import BookPage from "@/components/BookPage/BookPage";
const DashboardContent = () => {
  const opts: Genre[] = [
    { name: "love", value: "All Genres" },
    { name: "business", value: "Business" },
    { name: "science", value: "Science" },
    { name: "fiction", value: "Fiction" },
    { name: "philosophy", value: "Philosophy" },
    { name: "biography", value: "Biography" },
  ];
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const location = useLocation();
  const [chooseGenre, setChooseGenre] = useState(opts[0]);
  console.log(chooseGenre);

  const searchParams = new URLSearchParams(location.search);
  const fetchBookList = async () => {
    try {
      const req = getBookListInput(searchParams);
      const res = await API.app.getListBook(req);
      handleSetBookList(res.data.works);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBookList();
  }, []);

  useEffect(() => {
    navigateToGenre();
    fetchBookList();
  }, [chooseGenre]);

  const handleSetBookList = (bookList: Book[]) => {
    dispatch(setListBook(bookList));
  };

  const navigateToGenre = () => {
    const req: BookListQueryGenre = {
      genres: chooseGenre.name,
      page: "0",
    };
    const urlNext = Helper.toBookListPage(req);
    console.log(urlNext);
    navigate(urlNext);
  };
  const handleChooseGenre = (e: ChangeEvent) => {
    const chooseGenreName = e.target.value;
    const genre = opts.find((item) => item.name === chooseGenreName);
    setChooseGenre(genre);
  };

  return (
    <section className="w-full bg-[var(--background-content)]">
      <div className="container pt-5 pb-5 w-full">
        <div className="h-[45px] flex justify-between mt-10 mb-2">
          <form className="group relative px-2 flex justify-between w-[350px] h-full  border border-[var(--accent-color)] rounded-[25px] hover:border-[var(--dark-color)]">
            <SearchOutlined className="text-[var(--accent-color)] hover:cursor-pointer group-hover:text-[var(--dark-color)]" />
            <input
              className="h-full px-1 flex-1 outline-none bg-transparent"
              type="text"
            />
            <CloseCircleFilled className="text-[var(--accent-color)] group-hover:text-[var(--dark-color)]" />
          </form>
          <div className="flex items-center">
            <h2 className="h-fit font-bold pr-3">Genres</h2>
            <div className="relative group w-[150px] h-full">
              <select
                name="select-genre"
                id="select-genre"
                value={chooseGenre.name}
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
        </div>
        <span className="block w-full border-t opacity-70 border-[var(--accent-color)] "></span>
      </div>
      <div className="container">
        {/* <div className="w-full flex justify-end pb-5">
          <span
            onClick={fetchBookList}
            className="text-[var(--accent-color)] hover:cursor-pointer hover:text-[var(--dark-color)]"
          >
            View all products
          </span>
        </div> */}
        <BookPage />
      </div>
    </section>
  );
};

export default DashboardContent;
function getBookListInput(searchParams: URLSearchParams) {
  const result: BookListQueryGenre = {
    genres: "love",
    page: "0",
  };
  if (searchParams.size !== 0) {
    Object.keys(result).forEach((element: string) => {
      const param = searchParams.get(element);
      if (searchParams.has(element) && !!param) {
        result[element] = param;
      }
    });
  }
  return result;
}
