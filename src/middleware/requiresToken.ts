import "dotenv/config";
import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export async function requiresToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({ msg: "Missing token" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("Missing JWT_SECRET in environment");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded !== "object" || !("id" in decoded)) {
      return res.status(403).json({ msg: "Invalid token payload" });
    }

    const foundUser = await User.findById(decoded.id);

    if (!foundUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.locals.user = foundUser;
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ msg: "Unauthorized" });
  }
}
