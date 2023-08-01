const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { storage } = require("../../config/firebase");
const { uploadBytes, getDownloadURL, ref } = require("firebase/storage");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

const router = express.Router();

router.post("/image", async (req, res) => {
  const userUid = req.user.guid;
  const { image } = req.body;
  const user = await User.findByPk(userUid);
  const imageBuffer = Buffer.from(image, "base64");
  const imageRef = ref(storage, `images/${userUid}`);

  try {
    await deleteObject(imageRef);
  } catch (error) {
  }

  try {
    await uploadBytes(imageRef, imageBuffer);
    const downloadURL = await getDownloadURL(imageRef);
    user.imageUrl = downloadURL;
    await user.save();
  } catch (error) {
  }

  return res.json({
    user,
  });
});

router.post("/guid", async (req, res) => {
  const { guid } = req.body;
  const userId = req.user.id;
  const user = await User.findByPk(userId);

  user.guid = guid;
  await user.save();
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      guid: user.guid,
      imageUrl: user.imageUrl,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

router.put("/status", async (req, res) => {
  const userId = req.user.id;
  const { status } = req.body;
  const user = await User.findByPk(userId);
  user.isOnline = status;
  await user.save();
  return res.json({
    user,
  });
});

router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      guid: user.guid,
      imageUrl: user.imageUrl,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

router.post("/demo", async (req, res, next) => {
  const user = await User.unscoped().findOne({
    where: {
      username: "FakeUser2",
    },
  });

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    imageUrl: user.imageUrl,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { credential: "The provided credentials were invalid." };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    guid: user.guid,
    imageUrl: user.imageUrl,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;
