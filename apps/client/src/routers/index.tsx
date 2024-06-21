import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { Login, Chat } from "@/pages";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </Router>
  );
}
