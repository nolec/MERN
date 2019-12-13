import express from "express";
import auth from "../middleware/auth";
import { check } from "express-validator/check";
import {
  register,
  postLogin,
  authUser,
  deleteAll
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    check("name", "이름을 입력해주세요")
      .not()
      .isEmpty(),
    check("email", "이메일을 제대로 입력해주세요").isEmail(),
    check("password", "최소 6자 이상을 입력해주세요").isLength({ min: 6 })
  ],
  register
);

userRouter.get("/login", auth, authUser);
userRouter.post(
  "/login",
  [
    check("email", "이메일을 제대로 입력해주세요").isEmail(),
    check("password", "최소 6자 이상을 입력해주세요").exists()
  ],
  postLogin
);
userRouter.delete("/delete", auth, deleteAll);
export default userRouter;
