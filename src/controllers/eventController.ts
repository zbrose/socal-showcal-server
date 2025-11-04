import { type Request, type Response } from "express";
import * as eventService from "../services/eventService.js";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
    console.log(error);
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Event id is required" });
    const foundEvent = await eventService.getEventById(id);
    if (!foundEvent) return res.status(404).json({ error: "Event not found" });
    res.json(foundEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

export async function createEvent(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    const createdEvent = await eventService.createEvent(userId, req.body);
    res.status(201).json(createdEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create event" });
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Event id is required" });
    const updatedEvent = await eventService.updateEvent(id, req.body);
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update event" });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Event id is required" });
    await eventService.deleteEvent(id);
    res.status(204).json({ message: "Event deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete event" });
  }
}
