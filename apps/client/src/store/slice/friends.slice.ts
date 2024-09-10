import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {
  acceptInviteInFriends,
  Friend,
  FriendsList,
  getFriends,
  getFriendsReceiving,
  rejectInviteInFriends,
  deleteInFriend,
  getAllUnfriends,
  getFriendsInvite,
  createInvite,
  deleteFriendsReceiving,
} from "@/services/friends.service";

import axios from "axios";

interface FriendsInfo {
  friends: {
    friendsList: FriendsList | null | undefined;
    searchList: FriendsList | null | undefined;
  };
  invites: {
    invitesList: FriendsList | null | undefined;
    searchList: FriendsList | null | undefined;
  };
  newFriends: {
    newFriendsList: FriendsList | null | undefined;
    searchList: FriendsList | null | undefined;
  };
  receiving: {
    receivingList: FriendsList | null | undefined;
    searchList: FriendsList | null | undefined;
  };
  friendsOnline: Array<object>;
  status: "idle" | "loading" | "success" | "failed";
  error: { statusCode: string; message: string } | null | unknown;
}

export const getUnfriends = createAsyncThunk(
  "friends/all-unfriends",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUnfriends();

      if (response.status === 403) {
        throw new Error("Friends is error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const getReceiving = createAsyncThunk(
  "friends/receiving",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFriendsInvite();

      if (response.status === 400) {
        throw new Error("Error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const createReceiving = createAsyncThunk(
  "friends/create-receiving",
  async (data: Friend, { rejectWithValue }) => {
    try {
      const response = await createInvite(data);

      if (response.status === 400) {
        throw new Error("Reject receiving");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const rejectReceiving = createAsyncThunk(
  "friends/reject-receiving",
  async (data: Friend, { rejectWithValue }) => {
    try {
      const response = await deleteFriendsReceiving(data);

      if (response.status === 400) {
        throw new Error("Error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const getFriendsUser = createAsyncThunk(
  "friends/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFriends();

      if (response.status === 400) {
        throw new Error("Friends is error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const getInviteUser = createAsyncThunk(
  "friends/invites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFriendsReceiving();

      if (response.status === 400) {
        throw new Error("Invite is error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const acceptInvite = createAsyncThunk(
  "friends/accept-invite",
  async (data: Friend, { rejectWithValue }) => {
    try {
      const response = await acceptInviteInFriends(data);

      if (response.status === 400) {
        throw new Error("Invite is error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const rejectInvite = createAsyncThunk(
  "friends/reject-invite",
  async (data: Friend, { rejectWithValue }) => {
    try {
      const response = await rejectInviteInFriends(data);

      if (response.status === 400) {
        throw new Error("Invite is error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const deleteFriend = createAsyncThunk(
  "friends/delete-friend",
  async (data: Friend, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await deleteInFriend(data);

      if (response.status === 400) {
        throw new Error("Delete friend error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

const initialState: FriendsInfo = {
  friends: { friendsList: null, searchList: null },
  invites: { invitesList: null, searchList: null },
  newFriends: { newFriendsList: null, searchList: null },
  receiving: { receivingList: null, searchList: null },
  friendsOnline: [],
  status: "idle",
  error: null,
};

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    searchCurrentFriends: (state, action) => {
      if (action.payload !== "") {
        state.friends.searchList = state.friends?.friendsList?.filter((user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        );
      } else {
        state.friends.searchList = state.friends.friendsList;
      }
    },
    searchCurrentInvites: (state, action) => {
      if (action.payload !== "") {
        state.invites.searchList = state.invites?.invitesList?.filter((user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        );
      } else {
        state.invites.searchList = state.invites.invitesList;
      }
    },
    searchCurrentNewFriends: (state, action) => {
      if (action.payload !== "") {
        state.newFriends.searchList = state.newFriends?.newFriendsList?.filter(
          (user) =>
            `${user.firstName} ${user.lastName}`
              .toLowerCase()
              .includes(action.payload.toLowerCase())
        );
      } else {
        state.newFriends.searchList = state.newFriends.newFriendsList;
      }
    },
    searchCurrentReceiving: (state, action) => {
      if (action.payload !== "") {
        state.receiving.searchList = state.receiving?.receivingList?.filter(
          (user) =>
            `${user.firstName} ${user.lastName}`
              .toLowerCase()
              .includes(action.payload.toLowerCase())
        );
      } else {
        state.receiving.searchList = state.receiving.receivingList;
      }
    },
    friendsOnlineUpdate: (state, action) => {
      state.friendsOnline = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUnfriends.fulfilled, (state, action) => {
        state.newFriends.newFriendsList = action.payload;
        state.newFriends.searchList = action.payload;
      })
      .addCase(getReceiving.fulfilled, (state, action) => {
        state.receiving.receivingList = action.payload;
        state.receiving.searchList = action.payload;
      })
      .addCase(getFriendsUser.fulfilled, (state, action) => {
        state.friends.friendsList = action.payload;
        state.friends.searchList = action.payload;
      })
      .addCase(getInviteUser.fulfilled, (state, action) => {
        state.invites.invitesList = action.payload;
        state.invites.searchList = action.payload;
      })
      .addCase(acceptInvite.pending, (state) => {
        state.status = "idle";
      })
      .addCase(acceptInvite.fulfilled, (state, action) => {
        state.invites.invitesList = state.invites.invitesList?.filter(
          (e) => e.id !== action.payload.userInvite.id
        );
        state.friends.friendsList?.push(action.payload.userInvite);
        state.friends.friendsList = state.friends.friendsList?.sort((a, b) => {
          if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
            return -1;
          }
          if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        if (state.invites.searchList !== null) {
          state.invites.searchList = state.invites.searchList?.filter(
            (e) => e.id !== action.payload.userInvite.id
          );
          state.friends.searchList?.push(action.payload.userInvite);
        }
        state.status = "success";
      })
      .addCase(acceptInvite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createReceiving.fulfilled, (state, action) => {
        state.newFriends.newFriendsList =
          state.newFriends.newFriendsList?.filter(
            (e) => e.id !== action.payload.id
          );
        state.receiving.receivingList?.push(action.payload);
        state.receiving.receivingList = state.receiving.receivingList?.sort(
          (a, b) => {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
              return -1;
            }
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
              return 1;
            }
            return 0;
          }
        );
        if (state.newFriends.searchList !== null) {
          state.newFriends.searchList = state.newFriends.searchList?.filter(
            (e) => e.id !== action.payload.id
          );
          state.receiving.searchList?.push(action.payload);
          state.receiving.searchList = state.receiving.searchList?.sort(
            (a, b) => {
              if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
                return -1;
              }
              if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
                return 1;
              }
              return 0;
            }
          );
        }
      })
      .addCase(rejectReceiving.fulfilled, (state, action) => {
        state.receiving.receivingList = state.receiving.receivingList?.filter(
          (e) => e.id !== action.payload.id
        );
        state.newFriends.newFriendsList?.push(action.payload);
        state.newFriends.newFriendsList = state.newFriends.newFriendsList?.sort(
          (a, b) => {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
              return -1;
            }
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
              return 1;
            }
            return 0;
          }
        );
        if (state.receiving.searchList !== null) {
          state.receiving.searchList = state.receiving.searchList?.filter(
            (e) => e.id !== action.payload.id
          );
          state.newFriends.searchList?.push(action.payload);
          state.newFriends.searchList = state.newFriends.searchList?.sort(
            (a, b) => {
              if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
                return -1;
              }
              if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
                return 1;
              }
              return 0;
            }
          );
        }
      })
      .addCase(rejectInvite.fulfilled, (state, action) => {
        state.invites.invitesList = state.invites.invitesList?.filter(
          (e) => e.id !== action.payload.userInvite.id
        );
        state.newFriends.searchList?.push(action.payload.userInvite);
        state.newFriends.searchList = state.newFriends.searchList?.sort(
          (a, b) => {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
              return -1;
            }
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
              return 1;
            }
            return 0;
          }
        );
        if (state.invites.searchList !== null) {
          state.invites.searchList = state.invites.searchList?.filter(
            (e) => e.id !== action.payload.userInvite.id
          );
        }
      })
      .addCase(rejectInvite.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        state.friends.friendsList = state.friends.friendsList?.filter(
          (e) => e.id !== action.payload.id
        );
        state.newFriends.searchList?.push(action.payload);
        state.newFriends.searchList = state.newFriends.searchList?.sort(
          (a, b) => {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
              return -1;
            }
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
              return 1;
            }
            return 0;
          }
        );
        if (state.friends.searchList !== null) {
          state.friends.searchList = state.friends.searchList?.filter(
            (e) => e.id !== action.payload.id
          );
        }
      })
      .addCase(deleteFriend.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  searchCurrentFriends,
  searchCurrentInvites,
  searchCurrentNewFriends,
  searchCurrentReceiving,
  friendsOnlineUpdate,
} = friendsSlice.actions;

export const selectFriends = (state: RootState) => state.friends;

export default friendsSlice.reducer;
