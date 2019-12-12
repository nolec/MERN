import express from "express";
import { check, validationResult } from "express-validator/check";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const userRouter = express.Router();

userRouter.post(
  "/",
  [
    check("name", "이름을 입력해주세요")
      .not()
      .isEmpty(),
    check("email", "이메일을 입력해주세요").isEmail(),
    check("password", "최소 6자 이상 입력해주세요").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "이미 등록된 계정입니다." }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      user = new User({
        name,
        email,
        avatar,
        password
      });
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      console.log(user.password);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user._id
        }
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

export default userRouter;
