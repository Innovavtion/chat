import { AxiosResponse } from "axios";
import { ApiInterceptor } from "./utils/api.interceptor";
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
  const response = await ApiInterceptor.get("/user/auth");

  return response;
}

export async function logout(): Promise<void> {
  return await ApiInterceptor.get("auth/logout");
}
