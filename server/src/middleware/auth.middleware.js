import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: './src/.env' });
const authMiddleware = (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Auth failed!" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId ,  isAdmin: decodedToken.isAdmin || false, // add this line
};
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};

export default authMiddleware;