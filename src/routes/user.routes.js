import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const expressRouter = Router();

expressRouter.route("/register").post(registerUser);

export default expressRouter;
