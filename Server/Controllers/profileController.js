const db = require("../config/db");
require("dotenv").config();

const profileHandler = {};

profileHandler.showProfile = async (req, res, next) => {
  const userID = req.user.id;
  // console.log(req.user.id);

  const searchQuery =
    "select companyName,userName,email,phone,location,website from tolltracker.companyinfo where companyinfo.userID =?;";

  await db.query(searchQuery, [userID], (err, results) => {
    if (err) next(err);
    else {
      res.status(200).json(results);
    }
  });
};

module.exports = profileHandler;
