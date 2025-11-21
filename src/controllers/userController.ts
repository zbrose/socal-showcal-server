import { type Request, type Response } from "express";
import * as userService from "../services/userService.js";
import * as authService from "../auth/authHelper.js";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "User not found" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body || {};

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "username, email and password are required" });
    }

    const existingUser = await userService.getUserByEmail(email);

    if (existingUser)
      return res.status(409).json({
        message:
          "There is already a user with that email.  Please use a different one.",
      });

    const hashedPassword = await authService.hashPassword(password);

    const createdUser = await userService.createUser({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const token = await authService.authenticate({
      username: createdUser.username,
      email: createdUser.email,
      id: createdUser._id,
    });

    res.status(201).json({ token, user: createdUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Failed to create a new user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const foundUser = await userService.loginUser(email);

    if (!foundUser)
      return res.status(400).json({
        error:
          "There is no user with that email. Register as a new user or try another email.",
      });

    const matchPasswords = await authService.comparePasswords(
      password,
      foundUser.password
    );

    if (!matchPasswords) {
      return res.status(400).json({ error: "Incorrect email or password." });
    }

    const token = await authService.authenticate({
      username: foundUser.username,
      email: foundUser.email,
      id: foundUser._id,
    });

    res.json({ token, user: foundUser });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "There was an error logging the user in" });
  }
};

// router.get("/auth-locked", requiresToken, (req, res) => {
//   console.log(
//     "logged in user",
//     res.locals.user && sanitizeUser(res.locals.user)
//   );
//   res.json({
//     error: "welcome to the auth locked route, congrats on getting thru the middleware 🎉",
//   });
// });
