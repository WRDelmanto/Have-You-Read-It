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

    // For testing purposes only
    // await mongoose.connection.db.collection("books").deleteMany({});
    // await mongoose.connection.db.collection("authors").deleteMany({});
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

main();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
