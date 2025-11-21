import { User, type IUser } from "../models/index.js";

export const getUser = async (): Promise<IUser[]> => {
  return await User.find().select("-password").lean();
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({
    email,
  });
};

export const createUser = async (userData: Partial<IUser>) => {
  return await User.create(userData);
};

export const loginUser = async (email: string) => {
  return await User.findOne({
    email,
  })
    .populate("events")
    .exec();
};
