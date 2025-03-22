import jwt from "jsonwebtoken";

const JWT_SECRET = "secret_key";

export const verifyToken = (req) => {
  const token = req.cookies?.token;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};
