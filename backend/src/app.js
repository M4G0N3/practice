import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const expressApp = express();

expressApp.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

expressApp.use(express.json({ limit: "20kb" }));
expressApp.use(express.urlencoded({ extended: true, limit: "20kb" }));
expressApp.use(express.static("public"));
expressApp.use(cookieParser());

//routes

import expressRouter from "./routes/user.routes.js";

//Routes Declaration
expressApp.use("/api/v1/users", expressRouter);

export { expressApp };
