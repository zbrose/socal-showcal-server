import type { Types } from "mongoose";
import { Event, User, type IEvent } from "../models/index.js";

export const getAllEvents = async (): Promise<IEvent[]> => {
  return Event.find().populate({
    path: "user",
    select: "id username email",
  });
};

export const getEventById = (id: string): Promise<IEvent | null> => {
  return Event.findById(id);
};

export const createEvent = async (
  userId: string,
  eventData: Partial<IEvent>
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("createEvent: User not found");

  const event = await Event.create(eventData);

  user.events.push(event._id as Types.ObjectId);
  event.user.push(user._id as Types.ObjectId);

  await Promise.all([user.save(), event.save()]);

  return event;
};

export const updateEvent = (
  id: string,
  eventData: Partial<IEvent>
): Promise<IEvent | null> => {
  return Event.findOneAndUpdate({ _id: id }, eventData);
};

export const deleteEvent = async (id: string): Promise<void> => {
  User.updateMany({ $pull: { events: id } });
  Event.findByIdAndDelete(id);
};
