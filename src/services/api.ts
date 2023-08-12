import axios from "axios";
import type { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const conf = { ...config };
  return conf;
});

export default api;

export type ErrorResponse = {
  message: string;
  path: string;
  statusCode: number;
  timestamp: Date;
};
