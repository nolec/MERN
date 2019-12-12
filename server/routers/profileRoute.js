import express from "express";
import auth from "../middleware/auth";
import { check, validationResult } from "express-validator";
import {
  getProfiles,
  getMyProfile,
  getUserProfile,
  postCreateUpdate
} from "../controllers/profileController";
const profileRouter = express.Router();

profileRouter.get("/", getProfiles);
profileRouter.get("/me", auth, getMyProfile);
profileRouter.get("/:user_id", getUserProfile);
profileRouter.post(
  "/cu",
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
  postCreateUpdate
);

export default profileRouter;
