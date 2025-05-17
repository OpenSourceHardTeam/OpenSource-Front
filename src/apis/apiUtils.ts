import axiosInstance from "./axiosInstance";
import tokenInstance from "./tokenInstance";
import { ApiResponse } from "./types/response";

export const apiGet = async <T, P>(
  url: string,
  params?: P
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.get<ApiResponse<T>>(url, { params });
  return response.data;
};

export const apiPost = async <T, D>(
  url: string,
  data?: D
): Promise<ApiResponse<T>> => {
  const response = await axiosInstance.post<ApiResponse<T>>(url, data);
  return response.data;
};

export const authApiGet = async <T, P>(
  url: string,
  params?: P
): Promise<ApiResponse<T>> => {
  const response = await tokenInstance.get<ApiResponse<T>>(url, { params });
  return response.data;
};

export const authApiPost = async <T, D, P>(
  url: string,
  data?: D,
  params?: P
): Promise<ApiResponse<T>> => {
  const response = await tokenInstance.post<ApiResponse<T>>(url, data, {
    params,
  });
  return response.data;
};

export const authApiDelete = async <T, P>(
  url: string,
  params?: P
): Promise<ApiResponse<T>> => {
  const response = await tokenInstance.delete<ApiResponse<T>>(url, {
    params,
  });
  return response.data;
};

export const authApiPatch = async <T, D, P>(
  url: string,
  data?: D,
  params?: P
): Promise<ApiResponse<T>> => {
  const response = await tokenInstance.patch<ApiResponse<T>>(url, data, {
    params,
  });
  return response.data;
};

export const authApiPut = async <T, D, P>(
  url: string,
  data?: D,
  params?: P
): Promise<ApiResponse<T>> => {
  const response = await tokenInstance.put<ApiResponse<T>>(url, data, {
    params,
  });
  return response.data;
};
