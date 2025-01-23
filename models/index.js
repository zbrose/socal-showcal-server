require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}
//connect to the db uri
mongoose.connect(uri);
//grab the db connection
const db = mongoose.connection;
//have some callback messages on connection
db.once("open", () => {
  console.log(`mongoose connected @ ${db.host}:${db.name}`);
});
db.on("error", (err) => {
  console.log(err, "yo something so seriously WRONG");
});

module.exports.Event = require("./event");
