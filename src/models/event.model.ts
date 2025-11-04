import { Schema, model, Document, Types } from "mongoose";

export interface IEvent extends Document {
  title: string;
  date: Date;
  time: string;
  venue: string;
  address?: string;
  customVenueName?: string;
  otherAddress?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  cover?: string;
  link?: string;
  details?: string;
  color?: string;
  user: Types.ObjectId[];
}

const eventSchema = new Schema<IEvent>({
  title: String,
  date: String,
  time: String,
  venue: String,
  address: String,
  customVenueName: String,
  otherAddress: String,
  city: String,
  state: String,
  zipcode: Number,
  cover: Number,
  link: String,
  details: String,
  color: String,
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const Event = model<IEvent>("Event", eventSchema);
