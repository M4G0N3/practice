import dotenv from "dotenv";
import { expressApp } from "./app.js";
import connectDB from "./database/data.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    expressApp.on("error", (error) => {
      console.log(`Error: ${error}`);
      throw error;
    });

    expressApp.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MDB Failed", error);
  });

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
