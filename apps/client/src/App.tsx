import { Theme } from "@radix-ui/themes";

import "@radix-ui/themes/styles.css";
import "./App.module.css";

import { useAppDispatch } from "./store/store";
import { isAuth } from "@/store/slice/auth.slice";

import { RouterProvider } from "react-router-dom";
import { router } from "./routers";

import { ThemeProvider } from "./providers/ThemeProvider";

export default function App() {
  const dispatch = useAppDispatch();
  dispatch(isAuth());

  return (
    <ThemeProvider>
      <Theme accentColor="blue" grayColor="sand">
        <RouterProvider router={router} />
      </Theme>
    </ThemeProvider>
  );
}
