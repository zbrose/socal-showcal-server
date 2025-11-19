import "dotenv/config";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

// Export the connection object immediately. The connection is established
// when `connectDB()` is called from the entrypoint, so consumers can import
// the `db` object synchronously but still await an explicit connect step.
const db = mongoose.connection;

/**
 * Connect to MongoDB and return the mongoose connection.
 * Call this before starting the server so queries don't time out while
 * mongoose is still buffering.
 */
export async function connectDB(): Promise<typeof db> {
  const maxAttempts = 5;
  const baseDelayMs = 1000; // 1s

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Await the connection promise so callers can be certain the driver is ready.
      await mongoose.connect(uri!);

      db.once("open", () => {
        console.log(`mongoose connected @ ${db.host}:${db.name}`);
        console.log("Registered Models:", Object.keys(mongoose.models));
      });
      db.on("error", (err) => {
        console.log(err, "yo something so seriously WRONG");
      });
      return db;
    } catch (err: any) {
      const isLast = attempt === maxAttempts;
      const delay = baseDelayMs * Math.pow(2, attempt - 1);

      // Provide a clearer hint for DNS resolution failures
      if (
        err &&
        err.name === "MongooseServerSelectionError" &&
        /getaddrinfo ENOTFOUND/.test(String(err.message))
      ) {
        console.error(
          `MongoDB host lookup failed on attempt ${attempt}/${maxAttempts}: ${err.message}`
        );
        console.error(
          "Possible causes: incorrect MONGO_URI, network/DNS issues, firewall, or VPN blocking access."
        );
        console.error(
          "Check that MONGO_URI is correct, includes the correct hostnames, and that your machine can resolve them (eg. `nslookup <host>`)."
        );
      } else {
        console.error(
          `MongoDB connection attempt ${attempt} failed:`,
          err && err.message ? err.message : err
        );
      }

      if (isLast) {
        console.error(
          "Exceeded maximum MongoDB connection attempts. Giving up."
        );
        throw err;
      }

      console.log(`Retrying MongoDB connection in ${delay}ms...`);
      // backoff before retrying
      await sleep(delay);
    }
  }
  // Shouldn't reach here, but satisfy TypeScript
  throw new Error("Failed to connect to MongoDB");
}

export default db;
