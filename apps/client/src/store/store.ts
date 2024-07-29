import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import authReducer from "./slice/auth.slice";
import userReducer from "./slice/user.slice";
import friendsReducer from "./slice/friends.slice";
import dialogReducer from "./slice/dialog.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    friends: friendsReducer,
    dialog: dialogReducer,
  },
  devTools: import.meta.env.DEV === true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
