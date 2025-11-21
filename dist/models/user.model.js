import { Schema, model } from "mongoose";
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});
export const User = model("User", userSchema);
//# sourceMappingURL=user.model.js.map