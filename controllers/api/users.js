const router = require("express").Router();
const db = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const requiresToken = require("../requiresToken");

router.get("/", async (req, res) => {
  try {
    const allUsers = await db.User.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
  }
});

// POST /users/register -- CREATE a new user
router.post("/register", async (req, res) => {
  try {
    // check if the user exist already -- dont allow them to sign up again
    const userCheck = await db.User.findOne({
      email: req.body.email,
    });

    if (userCheck)
      return res.status(409).json({
        msg: "There is already a user with that email.  Please use a different one.",
      });

    // hash the pass (could validate if we wanted)
    const salt = 12;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a user in th db
    const newUser = await db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // create a jwt payload to send back to the client
    const payload = {
      username: newUser.username,
      email: newUser.email,
      id: newUser.id,
    };

    // sign the jwt and send it (log them in)
    const token = await jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ token });
    console.log("new user created", newUser);
  } catch (err) {
    console.log(err);
    res.status(503).json({ msg: "oops server error 503 🔥😭" });
  }
});

// POST /users/login -- validate login credentials
router.post("/login", async (req, res) => {
  // try to find the use in the db that is logging in
  const foundUser = await db.User.findOne({
    email: req.body.email,
  })
    .populate("events")
    .exec();

  // if the user is not found -- return and send back a message that the user needs to sign up
  if (!foundUser)
    return res.status(400).json({
      msg: "There is no user with that email. Register as a new user or try another email.",
    });

  // check the password from the req.body again the password in the db
  const matchPasswords = bcrypt.compare(req.body.password, foundUser.password);
  // console.log(matchPasswords)

  // if the provided info does not match -- send back an error message and return
  if (!matchPasswords)
    return res.status(400).json({ msg: "Incorrect email or password." });

  // create a jwt payload
  const payload = {
    username: foundUser.username,
    email: foundUser.email,
    id: foundUser.id,
  };

  // sign the jwt
  const token = await jwt.sign(payload, process.env.JWT_SECRET);

  // send it back
  res.json({ token });
  console.log(foundUser);
});

// GET /users/auth-locked -- example of checking an jwt and not serving data unless the jwt is valid
router.get("/auth-locked", requiresToken, (req, res) => {
  // here we have acces to the user on the res.locals
  console.log("logged in user", res.locals.user);
  res.json({
    msg: "welcome to the auth locked route, congrats on geting thru the middleware 🎉",
  });
});

module.exports = router;
