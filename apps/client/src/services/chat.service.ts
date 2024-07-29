import { AxiosResponse } from "axios";
import { ApiInterceptor } from "./utils/api.interceptor";

export type Friend = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  dataActive: string;
};

export type Message = {
  text: string;
  dataWrite: string;
};

export type CreateMessage = {
  chatId: string;
  message: string;
  otherUserId: string;
};

export type Chat = {
  id: string;
  messages: Array<Message>;
};

export type Chats = {
  chats: Array<Chat>;
};

export async function getChatsUser(): Promise<AxiosResponse<Chats>> {
  const response = await ApiInterceptor.get("chat/user-chats");

  return response;
}

export async function getCurrentChat(data: Chat): Promise<AxiosResponse<Chat>> {
  const response = await ApiInterceptor.get(`chat/current-chat/${data.id}`);

  return response;
}

export async function createMessage(
  data: CreateMessage
): Promise<AxiosResponse<Message>> {
  const response = await ApiInterceptor.post(
    "message/message-create-current-chat",
    data
  );

  return response;
}
