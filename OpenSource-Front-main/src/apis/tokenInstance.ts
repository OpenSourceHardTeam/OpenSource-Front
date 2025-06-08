import axios from "axios";
import routes from "@constants/routes";

const baseURL = import.meta.env.VITE_BASE_URL;

const tokenInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json', 
    Accept: 'application/json', 
  },
});

tokenInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

tokenInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 인증 에러(토큰 만료 등)만 메인 페이지로 리다이렉트
      window.location.href = routes.main;
    }
    // 다른 에러(404, 500 등)는 리다이렉트하지 않고 컴포넌트에서 처리
    return Promise.reject(error);
  }
);

export default tokenInstance;
