const mongoose = require("mongoose");

const uri = process.env.MONGO_CONNECTION_STRING;
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
