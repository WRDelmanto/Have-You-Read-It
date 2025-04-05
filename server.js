import express from "express";
import mongoose from "mongoose";
import { uri } from "./src/services/.env";
import DBRoutes from "./src/routes/DBRoutes.js";

const app = express();

app.use(express.json());
app.use(DBRoutes);

const main = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

main();

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
