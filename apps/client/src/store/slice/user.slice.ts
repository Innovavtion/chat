import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

import {
  getAuthUser,
  UpdateUserEmail,
  UpdateUserName,
  updateUserName,
  updateUserEmail,
  UpdateUserPassword,
  updateUserPassword,
  updateUserAvatar,
} from "@/services/user.service";

import axios from "axios";

interface UserInfo {
  user: null | {
    id: string;
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    dataRegistrate: string;
    roles: ["USER" | "ADMIN"];
  };
  status: "idle" | "loading" | "success" | "failed";
  error: { statusCode: number; message: string } | undefined | null | unknown;
}

export const getAuthUserInfo = createAsyncThunk(
  "user/getInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAuthUser();

      if (response.status === 401) {
        throw new Error("Get user error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "user/update-avatar",
  async (file: File, { rejectWithValue }) => {
    try {
      const response = await updateUserAvatar(file);

      if (response.status === 400) {
        throw new Error("Update user error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const updateName = createAsyncThunk(
  "user/update-name",
  async (userCredintial: UpdateUserName, { rejectWithValue }) => {
    try {
      const response = await updateUserName(userCredintial);

      if (response.status === 400) {
        throw new Error("Update user error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const updateEmail = createAsyncThunk(
  "user/update-email",
  async (userCredintial: UpdateUserEmail, { rejectWithValue }) => {
    try {
      const response = await updateUserEmail(userCredintial);

      if (response.status === 400) {
        throw new Error("Update user error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/update-password",
  async (userCredintial: UpdateUserPassword, { rejectWithValue }) => {
    try {
      const response = await updateUserPassword(userCredintial);

      if (response.status === 400) {
        throw new Error("Update user error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

const initialState: UserInfo = {
  user: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAuthUserInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAuthUserInfo.fulfilled, (state, action) => {
        state.user = action.payload[0];
        state.status = "success";
        state.error = null;
      })
      .addCase(getAuthUserInfo.rejected, (state) => {
        state.user = null;
        state.status = "failed";
        state.error = null;
      })
      .addCase(updateAvatar.pending, (state) => {
        state.status = "idle";
        state.error = null;
      })
      .addCase(updateName.pending, (state) => {
        state.status = "idle";
        state.error = null;
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "success";
        state.error = null;
      })
      .addCase(updateName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateEmail.pending, (state) => {
        state.status = "idle";
        state.error = null;
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "success";
        state.error = null;
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = "idle";
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "success";
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
