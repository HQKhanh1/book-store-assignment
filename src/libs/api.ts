import axios, { AxiosResponse } from "axios";

const API = {
  apiInstance: axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(import.meta.env.VITE_ENV === "development" && {
        "Access-Control-Allow-Origin": "*",
      }),
    },
  }),

  API_PATH: {
    APP: {
      LOGIN: "/example/login",
    },
  },
  app: {
    login: (): Promise<AxiosResponse<void>> => {
      return API.apiInstance.post(API.API_PATH.APP.LOGIN);
    },
  },
};

API.apiInstance.defaults.withCredentials = true;

export default API;
