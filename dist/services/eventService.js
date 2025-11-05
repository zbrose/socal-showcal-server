import { Event, User } from "../models/index.js";
export const getAllEvents = async () => {
    return Event.find().populate({
        path: "user",
        select: "id username email",
    });
};
export const getEventById = (id) => {
    return Event.findById(id);
};
export const createEvent = async (userId, eventData) => {
    const user = await User.findById(userId);
    if (!user)
        throw new Error("createEvent: User not found");
    const event = await Event.create(eventData);
    user.events.push(event._id);
    event.user.push(user._id);
    await Promise.all([user.save(), event.save()]);
    return event;
};
export const updateEvent = (id, eventData) => {
    return Event.findOneAndUpdate({ _id: id }, eventData);
};
export const deleteEvent = async (id) => {
    await User.updateMany({ $pull: { events: id } });
    await Event.findByIdAndDelete(id);
};
//# sourceMappingURL=eventService.js.map