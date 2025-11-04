const router = require("express").Router();
// const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const requiresToken = require("../requiresToken");

const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "12", 10);
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

const sanitizeUser = (user) =>
  user
    ? {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    : null;

router.get("/", async (req, res) => {
  try {
    const allUsers = await db.User.find().select("-password").lean();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body || {};

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ msg: "username, email and password are required" });
    }

    const existingUser = await db.User.findOne({
      email: email,
    });
    if (existingUser)
      return res.status(409).json({
        msg: "There is already a user with that email.  Please use a different one.",
      });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const createdUser = await db.User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const payload = {
      username: createdUser.username,
      email: createdUser.email,
      id: createdUser._id,
    };

    if (!JWT_SECRET) {
      console.error("Missing JWT_SECRET");
      return res
        .status(500)
        .json({ msg: "Server not configured for authentication" });
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(201).json({ token, user: sanitizeUser(createdUser) });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ msg: "email and password are required" });
    }

    const foundUser = await db.User.findOne({
      email,
    })
      .populate("events")
      .exec();
    if (!foundUser)
      return res.status(400).json({
        msg: "There is no user with that email. Register as a new user or try another email.",
      });

    const matchPasswords = await bcrypt.compare(password, foundUser.password);
    if (!matchPasswords) {
      return res.status(400).json({ msg: "Incorrect email or password." });
    }

    const payload = {
      username: foundUser.username,
      email: foundUser.email,
      id: foundUser.id,
    };

    if (!JWT_SECRET) {
      console.error("Missing JWT_SECRET");
      return res
        .status(500)
        .json({ msg: "Server not configured for authentication" });
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ token, user: sanitizeUser(foundUser) });
    console.log(foundUser);
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/auth-locked", requiresToken, (req, res) => {
  console.log(
    "logged in user",
    res.locals.user && sanitizeUser(res.locals.user)
  );
  res.json({
    msg: "welcome to the auth locked route, congrats on getting thru the middleware 🎉",
  });
});

module.exports = router;
