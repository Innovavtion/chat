import { AxiosResponse } from "axios";
import { ApiInterceptor } from "./utils/api.interceptor";

export type AuthSignUpResponse = {
  id: string;
  login: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  dataRegistrate: string;
  roles: ["USER" | "ADMIN"];
};

export type UpdateUserName = {
  firstName: string;
  lastName: string;
};

export type UpdateUserEmail = {
  email: string;
  password: string;
};

export type UpdateUserPassword = {
  newPassword: string;
  oldPassword: string;
};

export async function getAuthUser(): Promise<
  AxiosResponse<AuthSignUpResponse>
> {
  const response = await ApiInterceptor.get("/user/auth");

  return response;
}

export async function getAvatar(data: string) {
  const response = await ApiInterceptor.get(`user/avatar/${data}`);

  return response;
}

export async function updateUserAvatar(file: File) {
  const response = await ApiInterceptor.post("user/avatar/upload", file);

  return response;
}

export async function updateUserName(
  DataUser: UpdateUserName
): Promise<AxiosResponse<AuthSignUpResponse>> {
  const response = await ApiInterceptor.put("/user/update-username", DataUser);

  return response;
}

export async function updateUserEmail(
  DataUser: UpdateUserEmail
): Promise<AxiosResponse<AuthSignUpResponse>> {
  const response = await ApiInterceptor.put("user/update-email", DataUser);

  return response;
}

export async function updateUserPassword(
  DataUser: UpdateUserPassword
): Promise<AxiosResponse<AuthSignUpResponse>> {
  const response = await ApiInterceptor.put("user/update-password", DataUser);

  return response;
}
