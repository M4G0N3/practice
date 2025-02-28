import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const expressRouter = Router();

// expressRouter.route("/register").post(
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//     {
//       name: "coverImage",
//       maxCount: 1,
//     },
//   ]),
//   registerUser
// );

expressRouter.post(
  "/register",

  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),

  registerUser
);

export default expressRouter;
