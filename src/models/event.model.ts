import { Schema, model, Document, Types } from "mongoose";

export interface IEvent extends Document {
  title: string;
  date: Date;
  time: string;
  venue: string;
  address?: string;
  cover?: string;
  link?: string;
  details?: string;
  color?: string;
  customVenue?: string;
  user: Types.ObjectId[];
}

const eventSchema = new Schema<IEvent>({
  title: String,
  date: String,
  time: String,
  venue: String,
  address: String,
  cover: Number,
  link: String,
  details: String,
  color: String,
  customVenue: String,
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const Event = model<IEvent>("Event", eventSchema);
