import dotenv from "dotenv";

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";

import connectDB from "./database/data.js";

dotenv.config({
  path: "./.env",
});

connectDB();

// const port = process.env.PORT;
// const expressApp = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URL}`);
//     expressApp.on("error", () => {
//       console.log(`Error: ${error}`);
//       throw error;
//     });
//     expressApp.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   } catch (error) {
//     console.error(error);
//     throw err;
//   }
// })();
