import {
  Routes,
  Route,
  Navigate,
  Outlet,
  BrowserRouter as Router,
} from "react-router-dom";

import { Error, SignIn, SignUp, Chat } from "@/pages";

import { useAppDispatch, type RootState } from "../store/store";
import { useSelector } from "react-redux";
import { isAuth } from "@/store/slice/auth.slice";

const Private = () => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  return auth ? <Outlet /> : <Navigate to="/signin" />;
};

const CloseLoginForAuth = () => {
  const auth = useSelector((state: RootState) => state.auth.auth);
  return !auth ? <Outlet /> : <Navigate to="/chat" />;
};

export default function Routers() {
  const dispatch = useAppDispatch();
  dispatch(isAuth());

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route element={<CloseLoginForAuth />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<Private />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}
