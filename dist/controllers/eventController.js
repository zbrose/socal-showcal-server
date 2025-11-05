import * as eventService from "../services/eventService.js";
export const getAllEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
        console.log(error);
    }
};
export const getEventById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ error: "Event id is required" });
        const foundEvent = await eventService.getEventById(id);
        if (!foundEvent)
            return res.status(404).json({ error: "Event not found" });
        res.json(foundEvent);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch event" });
    }
};
export async function createEvent(req, res) {
    try {
        const userId = res.locals.user._id;
        const createdEvent = await eventService.createEvent(userId, req.body);
        res.status(201).json(createdEvent);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create event" });
    }
}
export async function updateEvent(req, res) {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ error: "Event id is required" });
        const updatedEvent = await eventService.updateEvent(id, req.body);
        res.status(200).json(updatedEvent);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update event" });
    }
}
export async function deleteEvent(req, res) {
    try {
        const id = req.params.id;
        if (!id)
            return res.status(400).json({ error: "Event id is required" });
        await eventService.deleteEvent(id);
        res.status(204).send({ message: "Event deleted" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete event" });
    }
}
//# sourceMappingURL=eventController.js.map