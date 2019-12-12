import Profile from "../models/Profile";
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.json(profiles);
  } catch (error) {
    console.log(error.message);

    res.status(500).send("Server Error");
  }
};
export const getMyProfile = async (req, res) => {
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
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res.status(400).json({ message: "프로필을 찾을 수 없습니다." });

    res.json(profile);
  } catch (error) {
    console.log(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ message: "프로필을 찾을 수 없습니다." });
    }
    res.status(500).send("Server Error :USER_ID");
  }
};

export const postCreateUpdate = async (req, res) => {
  const errors = validationResult(req);
  console.log(req.user);
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
    console.log(profileFields, "profilefields", req.user);
    let profile = await Profile.findById(req.user);
    console.log(profile, "나는 프로필");
    if (profile) {
      //update
      profile = await Profile.findByIdAndUpdate(
        { user: req.user },
        { $set: profileFields },
        { new: true }
      );
      return res.status(200).json(profile);
    }
    //create
    profile = new Profile(profileFields);
    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error??");
  }
};
