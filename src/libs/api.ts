import axios, { AxiosResponse } from "axios";
import { setLoading } from "@/redux/slices/loadingSlice"; // Import action setLoading từ slice của Redux
import * as Helper from "@/libs/helper";
import store from "@/redux/store"; // Import store Redux
import { BookListQueryGenre } from "@/models/BookListQueryGenre";
import { Subjects } from "@/models/Subject";
import { SearchResults } from "@/models/SearchResults";

const API = {
  apiInstance: axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
      "Content-Type": "application/json",
    },
  }),

  API_PATH: {
    APP: {
      LOGIN: "/example/login",
      BOOKS: {
        SUBJECT: "/subjects",
        SEARCH:
          "/search.json?title=$title&fields=key,title,author_name,cover_i,first_publish_year&page=$page&limit=12",
        ENDPOINT: ".json",
      },
    },
  },
  app: {
    login: (): Promise<AxiosResponse<void>> => {
      return API.apiInstance.post(API.API_PATH.APP.LOGIN);
    },
    getListBook(data: BookListQueryGenre): Promise<AxiosResponse<Subjects>> {
      const url = Helper.generateBookListUrl(data);
      return API.apiInstance.get(url);
    },
    searchBookName(
      data: string,
      pageNum: number
    ): Promise<AxiosResponse<SearchResults>> {
      const url = Helper.searchBookNameUrl(data, pageNum);
      return API.apiInstance.get(url);
    },
  },
};

API.apiInstance.interceptors.request.use(
  (config) => {
    store.dispatch(setLoading(true));
    return config;
  },
  (error) => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

API.apiInstance.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      store.dispatch(setLoading(false));
    }, 500);
    return response;
  },
  (error) => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

export default API;
