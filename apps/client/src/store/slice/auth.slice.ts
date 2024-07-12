import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  SignInData,
  SignUpData,
  signin,
  signup,
  logout as Logout,
  isAuth as IsAuth,
} from "@/services/auth.service";
import axios from "axios";

const accessToken: string | null = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

export interface AuthInfo {
  auth: boolean;
  accessToken: string | null | undefined;
  status: "idle" | "loading" | "success" | "failed";
  error: { statusCode: number; message: "string" } | undefined | unknown;
}

const initialState: AuthInfo = {
  auth: false,
  accessToken,
  status: "idle",
  error: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (userCredintial: SignInData, { rejectWithValue }) => {
    try {
      const response = await signin(userCredintial);

      if (response.status === 401) {
        throw new Error("Login Error");
      }

      localStorage.setItem("accessToken", response.data.accessToken);

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userCredintial: SignUpData, { rejectWithValue }) => {
    try {
      const response = await signup(userCredintial);

      if (response.status === 409) {
        throw new Error("Register Error");
      }

      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        return rejectWithValue(e.response?.data);
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await Logout();
  localStorage.clear();
  return response;
});

export const isAuth = createAsyncThunk(
  "user/auth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await IsAuth();

      if (response.status === 401 || response.request?.status === 401) {
        throw new Error("Auth Error");
      }

      return response.data;
    } catch (e) {
      if (e instanceof Error) return rejectWithValue(e.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state: AuthInfo, { payload }) => {
      localStorage.setItem("accessToken", payload.accessToken);
      state.accessToken = payload;
    },
    clearAuth: (state: AuthInfo) => {
      localStorage.removeItem("accessToken");
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.auth = false;
        state.accessToken = null;
        state.status = "loading";
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.auth = true;
        state.accessToken = action.payload?.accessToken;
        state.status = "success";
        state.error = "";
      })
      .addCase(login.rejected, (state) => {
        state.auth = false;
        state.accessToken = null;
        state.status = "failed";
        state.error = "Incorrect email or password";
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "success";
        state.error = "";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.auth = false;
        state.accessToken;
      })
      .addCase(isAuth.pending, (state) => {
        state.auth = false;
        state.accessToken;
        state.status = "loading";
        state.error = "";
      })
      .addCase(isAuth.fulfilled, (state) => {
        state.auth = true;
        state.accessToken;
        state.status = "success";
        state.error = "";
      })
      .addCase(isAuth.rejected, (state) => {
        state.auth = false;
        state.accessToken;
        state.status = "failed";
        state.error = "";
      });
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
