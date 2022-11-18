import React, { useState } from "react";
import axios from "axios";
import config from "../config";

function AddVehicle() {
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [description, setDescription] = useState("");

  const handleForm = async (e) => {
    const response = await axios.post(
      "http://localhost:3005/auth/addVehicle",
      {
        vehicleType,
        vehicleModel,
        registrationNo,
        description,
      },
      config()
    );

    if (response) {
      console.log(response.data);
      window.location.reload(false);
    }
  };

  return (
    <div className="w-full p-3 border-2 rounded-md shadow-md mt-5 flex flex-col">
      <form className="flex flex-col">
        <input
          name="vehicleType"
          placeholder="Vehicle Type"
          className="my-2 p-2 border-2 rounded-md h-10 focus:border-indigo-300 focus:ring  focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
          onChange={(e) => {
            setVehicleType(e.target.value);
          }}
        />
        <input
          name="vehicleModel"
          placeholder="Vehicle Model"
          className="my-2 p-2 border-2 rounded-md h-10 focus:border-indigo-300 focus:ring  focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
          onChange={(e) => {
            setVehicleModel(e.target.value);
          }}
        />
        <input
          name="registrationNo"
          placeholder="Registration No."
          className="my-2 p-2 border-2 rounded-md h-10 focus:border-indigo-300 focus:ring  focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
          onChange={(e) => {
            setRegistrationNo(e.target.value);
          }}
        />
        <input
          name="description"
          placeholder="Description"
          className="my-2 p-2 border-2 rounded-md h-10 focus:border-indigo-300 focus:ring  focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </form>

      <button
        className="bg-gray-300 p-3 rounded-md border-2 w-1/2 text-xl"
        onClick={(e) => {
          handleForm(e);
        }}
      >
        {" "}
        Add{" "}
      </button>
    </div>
  );
}

export default AddVehicle;
