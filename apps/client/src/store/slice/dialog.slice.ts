import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { Friend } from "@/services/friends.service";
import {
  Chat,
  Chats,
  createMessage,
  CreateMessage,
  getChatsUser,
  getCurrentChat,
} from "@/services/chat.service";

import axios from "axios";

interface Dialog {
  currentChatUser: Friend | null;
  chat: Chat | null;
  chats: Chats | null;
  error: string;
}

const initialState: Dialog = {
  currentChatUser: null,
  chat: null,
  chats: null,
  error: "",
};

export const getCurrentChatsUser = createAsyncThunk(
  "chat/get-chats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getChatsUser();

      if (response.status === 400) {
        throw new Error("Get chats error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const getChatUser = createAsyncThunk(
  "chat/get-chat",
  async (data: Chat, { rejectWithValue }) => {
    try {
      const response = await getCurrentChat(data);

      if (response.status === 400) {
        throw new Error("Get chat error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const createMessageChat = createAsyncThunk(
  "chat/create-messsage",
  async (data: CreateMessage, { rejectWithValue }) => {
    try {
      const response = await createMessage(data);

      if (response.status === 400) {
        throw new Error("Create message error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    clearCurrentChat: (state: Dialog) => {
      state.chat = null;
      state.currentChatUser = null;
    },
    getCurrentChatUser: (state: Dialog, action) => {
      state.chat = null;
      state.currentChatUser = action.payload;
    },
    typingMessageChat: (state: Dialog, action) => {
      state.chat.typing = action.payload;
      state.chat.typing.isTyping = action.payload.isTyping;
    },
    addMessageChat: (state: Dialog, action) => {
      state.chat?.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentChatsUser.fulfilled, (state, action) => {
        state.chats = action.payload;
      })
      .addCase(getChatUser.fulfilled, (state, action) => {
        state.chat = action.payload;
        state.chat.typing = {
          userId: state.currentChatUser?.id,
          isTyping: false,
        };
      })
      .addCase(getChatUser.pending, (state) => {
        state.chat = null;
      })
      .addCase(getChatUser.rejected, (state) => {
        state.chat = null;
      })
      .addCase(createMessageChat.fulfilled, (state, action) => {
        state.chat?.messages.push(action.payload);
      })
      .addCase(createMessageChat.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  clearCurrentChat,
  getCurrentChatUser,
  typingMessageChat,
  addMessageChat,
} = dialogSlice.actions;

export const selectDialog = (state: RootState) => state.dialog;

export default dialogSlice.reducer;
