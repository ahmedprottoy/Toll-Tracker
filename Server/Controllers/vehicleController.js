const db = require("../config/db");
require("dotenv").config();

const vehicleHandler = {};

vehicleHandler.addVehicle = (req, res, next) => {
  const userID = req.user.id;
  let { vehicleType, registrationNo, vehicleModel } = req.body;

  const insertQuery =
    "insert into tolltracker.vehicle(userID,vehicleType,registrationNo,vehicleModel) values(?, ?, ?,?);";

  db.query(
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

vehicleHandler.getAllVehicle = (req, res, next) => {
  const userID = req.user.id;

  const searchQuery = "select * from tolltracker.vehicle where userID= ? ;";

  db.query(searchQuery, [userID], (err, result) => {
    if (err) next(err);
    else {
      res.status(200).json(result);
    }
  });
};

module.exports = vehicleHandler;
