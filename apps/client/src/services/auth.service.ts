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
  const responseAccessToken = await axios.get("server/user/auth", {
    headers: { Authorization: localStorage.getItem("accessToken") },
  });

  if (responseAccessToken.status === 401) {
    const responseRefreshTokens = await axios.get("server/auth/refresh");
    return responseRefreshTokens;
  }

  return responseAccessToken;
}

export async function logout(): Promise<void> {
  return await axios.get("server/auth/logout", { headers: {} });
}
