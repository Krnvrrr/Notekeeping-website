const mongoose = require("mongoose");
const mongoURl = "mongodb://127.0.0.1:27017";

const connectToMongo = () => {
  mongoose.connect(mongoURl);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
};

module.exports = connectToMongo;
