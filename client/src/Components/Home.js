import React, { useState, useEffect } from "react";
// import Select from "react-select";
import config from "../config";
import axios from "axios";

export default function Home() {
  const option = [
    { value: "bus", label: "Bus" },
    { value: "minibus", label: "Minibus" },
    { value: "truck", label: "Truck" },
    { value: "car", label: "Car" },
    { value: "bike", label: "Bike" },
  ];

  const time = [
    { value: "12:01 am - 02:00 am", label: "12:01 am - 02:00 am" },
    { value: "02:01 am - 04:00 am", label: "02:01 am - 04:00 am" },
    { value: "04:01 am - 06:00 am", label: "04:01 am - 06:00 am" },
    { value: "06:01 am - 08:00 am", label: "06:01 am - 08:00 am" },
    { value: "08:01 am - 10:00 am", label: "08:01 am - 10:00 am" },
    { value: "10:01 am - 12:00 pm", label: "10:01 am - 12:00 pm" },

    { value: "12:01pam - 02:00 pm", label: "12:01 pm - 02:00 pm" },
    { value: "02:01 pm - 04:00 pm", label: "02:01 pm - 04:00 pm" },
    { value: "04:01 pm - 06:00 pm", label: "04:01 pm - 06:00 pm" },
    { value: "06:01 pm - 08:00 pm", label: "06:01 pm - 08:00 pm" },
    { value: "08:01 pm - 10:00 pm", label: "08:01 pm - 10:00 pm" },
    { value: "10:01 pm - 12:00 am", label: "10:01 pm - 12:00 am" },
  ];

  const [bridgeName, setSelectedBridge] = useState(null);
  const [vehicleTypexx, setSelectedVehicle] = useState(null);
  const [list, setList] = useState(null);
  const [toll, setToll] = useState("");
  const [crossTime, setCrossTime] = useState("");

  useEffect(() => {
    const getBridgeList = async () => {
      const response = await axios.get("http://localhost:3005/auth/bridgeList");

      if (response) {
        setList(response.data);
      }
    };
    getBridgeList();
  }, []);

  const getToll = async () => {
    console.log(bridgeName);
    console.log(vehicleTypexx);
    if (vehicleTypexx !== undefined) {
      const url = "http://localhost:3005/auth/bridgeToll";
      const response = await axios.post(url, {
        bridgeName,
        vehicleType: vehicleTypexx,
      });
      console.log(response.data[0].toll);

      if (response) {
        setToll(response.data[0].toll);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/2 flex flex-col items-center justify-center ">
        <div>
          <p>Choose a Bridge :</p>
          <select
            required
            onChange={(e) => {
              setSelectedBridge(e.target.value);
            }}
            className="shadow-lg w-96 my-3 h-10 bg-gray-200 border-2 border-solid border-zinc-400 rounded-md"
          >
            <option>-Select One-</option>
            {list
              ? list.map((item, i) => (
                  <option key={i} value={item.bridgeName}>
                    {item.bridgeName}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div>
          <p>Choose Vehicle Type :</p>
          <select
            required
            onChange={(e) => {
              setSelectedVehicle(e.target.value);
            }}
            className="shadow-lg border-2 w-96 my-3 h-10 bg-gray-200 border-solid border-zinc-400 rounded-md"
          >
            <option>-Select One-</option>
            {list
              ? option.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                ))
              : null}
          </select>
        </div>

        <button
          className="px-6 py-2 my-5 rounded-md shadow-md bg-gray-300 hover:bg-gray-400 duration-500"
          onClick={getToll}
        >
          <p className="text-xl">Check Toll</p>
        </button>

        <div>
          <p>Estimated Toll :</p>
          <div className="w-96 my-3 bg-gray-300 rounded-md shadow-md py-2 px-5 border-2 border-solid border-zinc-400">
            <p className="text-xl">{toll} Taka </p>
          </div>
        </div>

        <div>
          <p>Possible Time to Cross :</p>
          <select
            required
            onChange={(e) => {
              setCrossTime(e.target.value);
            }}
            className="shadow-lg border-2 w-96 my-3 h-10 bg-gray-200 border-solid border-zinc-400 rounded-md"
          >
            <option>-Select One-</option>
            {time
              ? time.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                ))
              : null}
          </select>
        </div>

        <button
          className="px-6 py-2 my-5 rounded-md shadow-md bg-gray-300 hover:bg-gray-400 duration-500"
          // onClick={getToll}
        >
          <p className="text-xl">Check Out</p>
        </button>
      </div>
    </div>
  );
}
