import { AxiosResponse } from "axios";
import { ApiInterceptor } from "./utils/api.interceptor";

export type Friend = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  dataActive: string;
};

export type FriendsList = Array<Friend>;

export async function getAllUnfriends(): Promise<AxiosResponse<FriendsList>> {
  const response = await ApiInterceptor.get("/friend/all-unfriends");

  return response;
}

export async function getFriends(): Promise<AxiosResponse<FriendsList>> {
  const response = await ApiInterceptor.get("/friend/all");

  return response;
}

export async function getFriendsInvite(): Promise<AxiosResponse<FriendsList>> {
  const response = await ApiInterceptor.get("/friend/user-invite-friends");

  return response;
}

export async function getFriendsReceiving(): Promise<
  AxiosResponse<FriendsList>
> {
  const response = await ApiInterceptor.get("/friend/user-receiving-friends");

  return response;
}

export async function createInvite(
  data: Friend
): Promise<AxiosResponse<FriendsList>> {
  const response = await ApiInterceptor.post("/friend/new", data);

  return response;
}

export async function acceptInviteInFriends(
  data: Friend
): Promise<AxiosResponse<FriendsList>> {
  const response = await ApiInterceptor.put("/friend/user-accept-invite", data);

  return response;
}

export async function createFriendsInvite(
  data
): Promise<AxiosResponse<FriendsList>> {
  const response = await ApiInterceptor.post("/friend/new");

  return response;
}

export async function rejectInviteInFriends(
  data: Friend
): Promise<AxiosResponse<FriendsList>> {
  const response = await ApiInterceptor.delete(
    "/friend/reject-invite-friends",
    { data: { id: data.id } }
  );

  return response;
}

export async function deleteFriendsReceiving(
  data: Friend
): Promise<AxiosResponse<FriendsList>> {
  const response = await ApiInterceptor.delete(
    "/friend/reject-receiving-friends",
    { data: { id: data.id } }
  );

  return response;
}

export async function deleteInFriend(
  data: Friend
): Promise<AxiosResponse<FriendsList>> {
  const response = await ApiInterceptor.delete("/friend/remove", {
    data: { id: data.id },
  });

  return response;
}
