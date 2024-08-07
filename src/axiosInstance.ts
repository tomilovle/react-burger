import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleAxiosResponse = (res: AxiosResponse) => {
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  } else {
    return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
  }
};

export default axiosInstance;
