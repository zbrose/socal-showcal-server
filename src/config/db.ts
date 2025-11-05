import "dotenv/config";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose.connect(uri);

const db = mongoose.connection;

db.once("open", () => {
  console.log(`mongoose connected @ ${db.host}:${db.name}`);
  console.log("Registered Models:", Object.keys(mongoose.models));
});
db.on("error", (err) => {
  console.log(err, "yo something so seriously WRONG");
});

export default db;
