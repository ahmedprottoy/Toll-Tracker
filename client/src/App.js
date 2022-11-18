import React from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
