import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Profile from "../models/Profile";
import { validationResult } from "express-validator/check";

export const register = async (req, res) => {
  //MongoDB에 접근해야하기에 async await 사용
  let errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { name, email, password } = req.body;
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
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user._id
      }
    };
    console.log(payload);
    jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ user, token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};

export const postLogin = async (req, res) => {
  //MongoDB에 접근해야하기에 async await 사용
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "등록된 계정이 없습니다." }] });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "비밀번호가 틀렸습니다." }] });
    }

    const payload = {
      user: {
        id: user._id
      }
    };
    console.log(payload);
    jwt.sign(payload, "secret", { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ user, token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};
export const authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteAll = async (req, res) => {
  try {
    //Remove
    console.log(req.user);
    await Profile.findOneAndRemove({ user: req.user });
    await User.findOneAndRemove({ _id: req.user });
    res.json({ msg: "유저가 삭제되었습니다." });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error :delete");
  }
};
