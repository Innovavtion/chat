import { createBrowserRouter, redirect } from "react-router-dom";

import { SignIn, SignUp, Chat } from "@/pages";

import { AuthGuard } from "./guard/AuthGuard";

export type AuthGuardProps = {
  redirectPath: string;
  props?: React.ReactElement;
};

export const router = createBrowserRouter([
  {
    path: "*",
    loader: () => redirect("/signin"),
  },
  {
    element: <AuthGuard redirectPath="/chat" guardType="unauth" />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
  {
    element: <AuthGuard redirectPath="/signin" guardType="auth" />,
    children: [
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
]);
