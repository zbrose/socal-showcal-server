import { User } from "../models/index.js";
export const getUser = async () => {
    return await User.find().select("-password").lean();
};
export const getUserByEmail = async (email) => {
    return await User.findOne({
        email,
    });
};
export const createUser = async (userData) => {
    return await User.create(userData);
};
export const loginUser = async (email) => {
    return await User.findOne({
        email,
    })
        .populate("events")
        .exec();
};
//# sourceMappingURL=userService.js.map