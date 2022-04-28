require("dotenv").config();
const mongoose = require("mongoose");

function connectDB() {
  // Database connection

  mongoose.connect(process.env.MONGO_COONNECTION_URL);

  mongoose.connection
    .once("open", function () {
      console.log("Databse connected");
    })
    .on("error", function (err) {
      console.log(err, "Connection failed");
    });
}
module.exports = connectDB;
