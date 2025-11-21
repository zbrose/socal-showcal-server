import { Schema, model } from "mongoose";
const eventSchema = new Schema({
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
export const Event = model("Event", eventSchema);
//# sourceMappingURL=event.model.js.map