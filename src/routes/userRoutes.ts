import { Router } from "express";
import * as userController from "../controllers/userController.js";

const router = Router();

router.get("/login", userController.getUser);
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

export default router;
