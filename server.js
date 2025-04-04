import mongoose from "mongoose";
import { uri } from "./src/services/.env";
import populateDB from "./src/utils/MockData.js";

const main = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully");

    populateDB();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

main();
