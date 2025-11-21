import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "12", 10);
const JWT_SECRET = process.env.JWT_SECRET ?? "";
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};
export const comparePasswords = async (password, matchedPassword) => {
    return await bcrypt.compare(password, matchedPassword);
};
export const authenticate = async (payload) => {
    if (!JWT_SECRET) {
        console.error("Missing JWT_SECRET");
        throw new Error("Server not configured for authentication");
    }
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
};
//# sourceMappingURL=authHelper.js.map