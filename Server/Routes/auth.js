const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authenticateToken");
const authControl = require("../Controllers/authController");
const vehicleControl = require("../Controllers/vehicleController");
const profileControl = require("../Controllers/profileController");

//signup,login
router.post("/signUp", authControl.signUp);
router.post("/logIn", authControl.logIn);

//vehicle
router.post("/addVehicle", authentication, vehicleControl.addVehicle);
router.get("/getAllVehicle", authentication, vehicleControl.getAllVehicle);
router.delete(
  "/deleteVehicle/:vehicleID",
  authentication,
  vehicleControl.deleteVehicle
);

//profile

router.get("/showProfile/:userID", authentication, profileControl.showProfile);

module.exports = router;
