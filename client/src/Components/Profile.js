import React, { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import VehicleList from "./VehicleList";
import AddVehicle from "./AddVehicle";

function Profile() {
  let [open, setOpen] = useState(true);
  return (
    <div className="flex justify-center ">
      <div className="w-11/12  flex flex-row">
        <div className="w-5/12 h-2/3 p-5 shadow-lg rounded-lg mt-5">
          <ProfileInfo />
        </div>
        <div className="w-6/12 ml-10 h-2/3 p-5 shadow-lg rounded-lg mt-5 flex flex-col items-center overflow-scroll overflow-x-hidden scroll-smooth">
          <p className="text-2xl w-full font-semibold p-3 bg-gray-300 rounded-md">
            Register Vehicle List :
          </p>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl cursor-pointer my-5"
          >
            {open ? (
              <>
                <p>
                  <span className="mr-3">Add Vehicle</span>
                  <i class="fa-solid fa-plus"></i>
                </p>
              </>
            ) : (
              <>
                <p>
                  <span className="mr-3">Cancecl</span>
                  <i class="fa-solid fa-xmark"></i>
                </p>
              </>
            )}
          </div>

          <div className={`w-9/12 ${open ? "hidden " : "block"}`}>
            <AddVehicle />
          </div>

          <VehicleList />
        </div>
      </div>
    </div>
  );
}

export default Profile;
