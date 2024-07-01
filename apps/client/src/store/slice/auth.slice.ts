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

const accessToken: string | null = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

interface AuthInfo {
  auth: boolean;
  accessToken: string | null;
}

const initialState: AuthInfo = {
  auth: false,
  accessToken,
};

export const login = createAsyncThunk(
  "server/auth/login",
  async (userCredintial: SignInData) => {
    const response = await signin(userCredintial);
    localStorage.setItem("accessToken", response.data.accessToken);
    setAuth(response.data.accessToken);
    return response;
  }
);

export const register = createAsyncThunk(
  "server/auth/register",
  async (userCredintial: SignUpData) => {
    const response = await signup(userCredintial);
    return response;
  }
);

export const logout = createAsyncThunk("server/auth/logout", async () => {
  await Logout();
  localStorage.clear();
});

export const isAuth = createAsyncThunk("server/user/auth", async () => {
  const response = await IsAuth();
  setAuth(response.data.accessToken);
});

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
      })
      .addCase(login.fulfilled, (state, action) => {
        state.auth = true;
        state.accessToken = action.payload.data.accessToken;
      })
      .addCase(login.rejected, (state) => {
        state.auth = false;
        state.accessToken = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.auth = false;
        state.accessToken = null;
      })
      .addCase(logout.pending, (state) => {
        state.auth = true;
        state.accessToken;
      })
      .addCase(logout.rejected, (state) => {
        state.auth = true;
        state.accessToken;
      })
      .addCase(isAuth.fulfilled, (state) => {
        state.auth = true;
        state.accessToken;
      })
      .addCase(isAuth.rejected, (state) => {
        state.auth = false;
        state.accessToken;
      });
  },
});

export const { setAuth, clearAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
