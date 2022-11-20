const db = require("../config/db");
require("dotenv").config();

const bridgeHandler = {};

bridgeHandler.bridgeList = async (req, res, next) => {
  const searchQuery = "SELECT * FROM tolltracker.bridges;";

  await db.query(searchQuery, (err, result) => {
    if (err) next(err);
    else {
      res.status(200).json(result);
    }
  });
};

bridgeHandler.bridgeToll = async (req, res, next) => {
  const { bridgeName, vehicleType } = req.body;

  const searchQuery = `select toll from tolltracker.bridges,tolltracker.${vehicleType} 
where bridges.bridgeID=${vehicleType}.bridgeID and bridges.bridgeName=?;`;

  await db.query(searchQuery, [bridgeName], (err, result) => {
    if (err) next(err);
    else {
      res.status(200).json(result);
    }
  });
};

module.exports = bridgeHandler;
