import { Theme, ThemePanel } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "./App.module.css";

import { useAppDispatch } from "./store/store";
import { isAuth } from "@/store/slice/auth.slice";

import { RouterProvider } from "react-router-dom";
import { router } from "./routers";

export default function App() {
  const dispatch = useAppDispatch();
  dispatch(isAuth());

  return (
    <Theme appearance="light" accentColor="blue" grayColor="sand">
      <RouterProvider router={router} />
      <ThemePanel />
    </Theme>
  );
}
