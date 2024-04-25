import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const MONGO_URI = process.env["MONGO_URI"];
    if (MONGO_URI) await mongoose.connect(MONGO_URI, { dbName: "tender" });
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB: ", error);
    process.exit(1);
  }
};
