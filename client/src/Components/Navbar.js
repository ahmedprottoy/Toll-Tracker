import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full h-20 flex flex-row justify-between items-center px-20 shadow-lg mb-5">
      <div className="flex items-center">
        <i class="fa-solid fa-bridge fa-2x"></i>
        <p className="text-3xl mx-7 hover:scale-110 duration-700">
          Toll Tracker
        </p>
      </div>

      <div>
        <ul className="flex flex-row items-center">
          <li className="px-8 text-xl hover:scale-110 duration-700">
            <Link to="/Home">
              <p>Home</p>
            </Link>
          </li>
          <li className="px-10 text-xl hover:scale-110 duration-700">
            <Link to="/Profile">
              <p>Profile</p>
            </Link>
          </li>
          <li className="px-5 text-xl hover:scale-105 duration-700">
            <button className="shadow-lg px-5 py-3 bg-gray-200 border-2 border-gray-400 rounded-md">
              {" "}
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
