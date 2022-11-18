const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const mysql = require("mysql");
require("dotenv").config();

exports.signUp = async (req, res) => {
  const { companyName, userName, email, phone, password } = req.body;
  console.log(phone);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const searchQuery = mysql.format(
      "SELECT * FROM tolltracker.companyinfo WHERE userName = ?",
      [userName]
    );

    const insertQuery = mysql.format(
      "INSERT INTO tolltracker.companyinfo (companyName, userName,email, phone,password) VALUES (?,?,?,?,?)",
      [companyName, userName, email, phone, hashedPassword]
    );

    db.query(searchQuery, async (err, result) => {
      if (err) {
        throw err;
      } else if (result.length !== 0) {
        console.log("---User Already Exists--");
        res.json({ msg: "User Already Exists With This Name" });
      } else {
        db.query(insertQuery, async (err, result) => {
          if (err) throw err;
          else {
            console.log("---New User Created---");
            res.json({ msg: "A New User Has Been Created", next: true });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

exports.logIn = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res.json({ error: "Please Provide inputs for all fields" });
  }

  try {
    const searchQuery = mysql.format(
      "SELECT * FROM tolltracker.companyinfo WHERE userName=?",
      [userName]
    );

    db.query(searchQuery, async (err, result) => {
      if (err) {
        throw err;
      }

      if (result.length == 0) {
        console.log("user doesnt exist", userName);
        res.json({ msg: "User Not Found", next: false });
      } else {
        const hashedPassword = result[0].password;
        const userID = result[0].userID;
        const validPassword = await bcrypt.compare(password, hashedPassword);

        if (validPassword) {
          console.log("---Log In Successful---");
          const user = { id: userID };
          const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {});

          req.session.user = result;
          console.log(req.session.user);

          res.status(200).json({
            accessToken: token,
            msg: `${userName} is logged in.`,
            next: true,
            id: userID,
            user: result[0].userName,
          });
        } else {
          console.log("---Password Incorrect----");
          res.json({ msg: `Invalid Password`, next: false });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};
