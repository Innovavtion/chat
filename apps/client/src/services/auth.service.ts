import { AxiosResponse } from "axios";
import axios from "axios";

export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = {
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordRepeat: string;
};

type AuthSingInResponse = {
  accessToken: string;
  refreshToken: string;
};

type AuthSingUpResponse = {
  id: string;
  login: string;
  email: string;
  lastName: string;
  firstName: string;
  dataRegistrate: string;
  roles: ["USER" | "ADMIN"];
};

const AxiosApi = axios.create({
  withCredentials: true,
  baseURL: "/server",
});

AxiosApi.interceptors.request.use(async (config) => {
  config.headers.Authorization = localStorage.getItem("accessToken");
  return config;
});

AxiosApi.interceptors.response.use(
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
        return AxiosApi.request(originalRequest);
      } catch (e) {
        return e;
      }
    }
    throw error;
  }
);

export async function signin(
  SignInData: SignInData
): Promise<AxiosResponse<AuthSingInResponse>> {
  const response = await axios.post<AuthSingInResponse>(
    "server/auth/login",
    SignInData
  );

  return response;
}

export async function signup(
  SignUpData: SignUpData
): Promise<AxiosResponse<AuthSingUpResponse>> {
  const response = await axios.post<AuthSingUpResponse>(
    "server/auth/register",
    SignUpData
  );

  return response;
}

export async function isAuth(): Promise<AxiosResponse<AuthSingInResponse>> {
  const response = await AxiosApi.get("/user/auth");

  return response;
}

export async function logout(): Promise<void> {
  return await AxiosApi.get("auth/logout");
}
