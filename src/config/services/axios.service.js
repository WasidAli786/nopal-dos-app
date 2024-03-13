import axios from "axios";
import { baseURL } from "../constant";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const { getStorageItem } = useLocalStorage();

const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getStorageItem("token");

    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
