import express from "express";
import auth from "../middleware/auth";
import Profile from "../models/Profile";
import User from "../models/User";
import { check, validationResult } from "express-validator";

const profileRouter = express.Router();

profileRouter.get("/me", auth, async (req, res) => {
  try {
    console.log(req.user);
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ message: "프로필이 없습니다." });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

profileRouter.post(
  "/",
  [
    auth,
    [
      check("status", "상태가 필요합니다.")
        .not()
        .isEmpty(),
      check("skills", "스킬이 필요합니다.")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    console.log(req.user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      company,
      website,
      location,
      bio,
      status,
      skills,
      githubusername,
      youtube
    } = req.body;
    //Build profile object
    const profileFields = {};
    console.log(req.user, "profilefields");
    profileFields.user = req.user;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.lcoation = lcoation;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.status(200).json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
    res.send("hello");
  }
);
profileRouter.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res.status(400).json({ message: "프로필이 없습니다." });

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
export default profileRouter;
