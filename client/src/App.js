import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Profile from "./Components/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />

        <Route path="/*" element={<Layout />}>
          <Route path="Home" element={<Home />} />
          <Route path="Profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
