import axios, { AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.data?.message) {
      alert(error.response?.data?.message);
    } else {
      alert("에러가 발생했습니다.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
