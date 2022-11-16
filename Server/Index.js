require("dotenv").config();
const cors = require("cors");
const express = require("express");
const port = process.env.PORT;
const { request } = require("http");
const app = express();
const db = require("./config/db");
const http = require("http");
const auth = require("./Routes/auth");
const errorHandler = require("./middleware/errorHandler");
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.json());

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  session({
    key: "userID",
    secret: "trying Out session cookie",
    resave: false,
    saveUninitialized: false,
    cookie: { expires: 1000 * 60 * 60 * 24 },
  })
);

db.getConnection((err, connection) => {
  if (err) {
    throw err;
  }
  console.log(`Database connections successful  ${connection.threadId}`);
});

app.use("/auth", auth);
app.use(errorHandler.handle);

server.listen(port, () => {
  console.log(`Server Started On Port ${port}`);
});
