import React from "react";
import config from "../config";
import Navbar from "../Components/Navbar";
import { Navigate, Outlet } from "react-router-dom";
// import Navbar from "./Navbar";

function Layout() {
  let loggedin = config().headers.authorization;
  return loggedin ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <>
      <Navigate to="/LogIn" />
    </>
  );
}

export default Layout;
