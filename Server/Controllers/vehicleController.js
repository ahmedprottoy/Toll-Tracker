const db = require("../config/db");
require("dotenv").config();

const vehicleHandler = {};

//create
vehicleHandler.addVehicle = async (req, res, next) => {
  const userID = req.user.id;
  let { vehicleType, registrationNo, vehicleModel } = req.body;

  const insertQuery =
    "insert into tolltracker.vehicle(userID,vehicleType,registrationNo,vehicleModel) values(?, ?, ?,?);";

  await db.query(
    insertQuery,
    [userID, vehicleType, registrationNo, vehicleModel],
    (err, result) => {
      if (err) next(err);
      else {
        res.json({ msg: "vehicle added" });
      }
    }
  );
};

//get list of vehicle
vehicleHandler.getAllVehicle = async (req, res, next) => {
  const userID = req.user.id;

  const searchQuery = "select * from tolltracker.vehicle where userID= ? ;";

  await db.query(searchQuery, [userID], (err, result) => {
    if (err) next(err);
    else {
      res.status(200).json(result);
    }
  });
};

//delete vehicle
vehicleHandler.deleteVehicle = async (req, res, next) => {
  const vehicleID = req.params.vehicleID;

  const deleteQuery = "delete from  tolltracker.vehicle where vehicleID=?;";

  await db.query(deleteQuery, [vehicleID], (err, result) => {
    if (err) next(err);
    else {
      res.status(200).json({ msg: "vehicle is deleted" });
    }
  });
};

//
module.exports = vehicleHandler;
