import React, { useState, useEffect } from "react";
import config from "../config";
import bus from "../images/busIcon.png";
import bike from "../images/bikeIcon.png";
import truck from "../images/truckIcon.png";
import car from "../images/carIcon.png";
import axios from "axios";

function VehicleList() {
  const [list, setList] = useState([]);
  console.log(list);

  useEffect(() => {
    getAllVehicle();
  }, []);

  const getAllVehicle = async () => {
    // console.log("list hit");
    const response = await axios.get(
      "http://localhost:3005/auth/getAllVehicle",
      config()
    );

    if (response) {
      const allVehicle = response.data;
      allVehicle.sort((a, b) => (a.vehicleID < b.vehicleID ? 1 : -1));
      setList(allVehicle);
    }
  };

  const deleteVehicle = async (data) => {
    const response = await axios.delete(
      `http://localhost:3005/auth/deleteVehicle/${data}`,
      config()
    );

    if (response) {
      console.log(response);
    }
    window.location.reload(false);
  };

  if (list.length > 0) {
    return list.map((list, index) => {
      return (
        <div
          key={index}
          className="w-9/12 p-3 border-2 rounded-md shadow-md mt-5"
        >
          <div className="flex justify-between">
            <span class="inline-block rounded w-16  text-white">
              <img src={bus} alt="" />
            </span>
            <span
              className="mr-5 mt-4 cursor-pointer"
              onClick={() => {
                deleteVehicle(list.vehicleID);
              }}
            >
              <i class="fa-solid fa-trash-can fa-2x"></i>
            </span>
          </div>
          {/* src={`${list.vehicleModel.toLowerCase()}`} */}
          <p className="mt-3 text-xl ">
            <span className="font-bold text-2xl">Type : </span>
            {list.vehicleType}
          </p>
          <p className="mt-3 text-xl ">
            <span className="font-bold text-2xl">Model : </span>
            {list.vehicleModel}
          </p>
          <p className="mt-3 text-xl ">
            <span className="font-bold text-2xl">Registration No : </span>{" "}
            {list.registrationNo}
          </p>
          <p className="mt-3 text-xl ">
            {" "}
            <span className="font-bold text-2xl">Description : </span>
            {list.description}
          </p>
        </div>
      );
    });
  } else {
    return (
      <div>
        <p>No Registered vehicle... </p>
      </div>
    );
  }
}

export default VehicleList;
