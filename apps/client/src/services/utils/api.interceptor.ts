import axios from "axios";

export const ApiInterceptor = axios.create({
  withCredentials: true,
  baseURL: "/server",
});

ApiInterceptor.interceptors.request.use(async (config) => {
  config.headers.Authorization = localStorage.getItem("accessToken");
  return config;
});

ApiInterceptor.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get("/server/auth/refresh", {
          withCredentials: true,
        });
        localStorage.setItem("accessToken", response.data.accessToken);
        return ApiInterceptor.request(originalRequest);
      } catch (e) {
        return e;
      }
    }
    throw error;
  }
);
