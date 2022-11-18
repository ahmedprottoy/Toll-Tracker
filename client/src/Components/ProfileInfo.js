import React, { useState, useeffect, useEffect } from "react";
import profilecard from "../images/bus.jpg";
import config from "../config";
import axios from "axios";

function ProfileInfo() {
  const [info, setInfo] = useState({});

  //   console.log(info.companyName);

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const response = await axios.get(
      "http://localhost:3005/auth/showProfile",
      config()
    );

    if (response) {
      setInfo(response.data[0]);
    }
  };

  return (
    <article class="group">
      <img
        alt="Lava"
        src={profilecard}
        class="h-56 w-full rounded-xl object-cover shadow-xl transition"
      />

      <div class="p-4">
        <p class="text-3xl font-semibold mt-3 p-2 text-gray-900 rounded-md bg-gray-300">
          {info.companyName}
        </p>

        <p className="my-5 mx-2 text-xl">
          <b> User Name :</b> {info.userName}
        </p>
        <p className="my-5 mx-2 text-xl">
          {" "}
          <b>Email :</b> {info.email}
        </p>
        <p className="my-5 mx-2 text-xl">
          {" "}
          <b>Contact No :</b> {info.phone}
        </p>
        <p className="my-5 mx-2 text-xl">
          {" "}
          <b>Location :</b> {info.location}
        </p>
        <p className="my-5 mx-2 text-xl">
          {" "}
          <b>Website :</b> {info.website}
        </p>
      </div>
    </article>
  );
}

export default ProfileInfo;
