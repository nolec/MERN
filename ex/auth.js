import express from "express";
import auth from "../middleware/auth";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator/check";

const authRouter = express.Router();

authRouter.get("/", auth, async (req, res) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});
authRouter.post(
  "/",
  [
    check("email", "이메일을 입력해주세요").isEmail(),
    check("password", "비밀번호를 입력해주세요").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "등록된 계정이 없습니다." }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "비밀번호가 틀렸습니다." }] });
      }
      const payload = {
        user: user._id
      };
      jwt.sign(payload, "secret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;

        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Server Error");
    }
  }
);
export default authRouter;
