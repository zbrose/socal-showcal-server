import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  events: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

export const User = model<IUser>("User", userSchema);
