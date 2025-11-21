import { Router } from "express";
import * as eventController from "../controllers/eventController.js";
import { requiresToken } from "../middleware/requiresToken.js";

const router = Router();

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/new", requiresToken, eventController.createEvent);
router.put("/:id/edit", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

export default router;
