import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  //  const token = req.cookies?.token;

   const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  // let token;
  // if (req.headers.authorization?.startsWith("Bearer")) {
  //   token = req.headers.authorization.split(" ")[1];
  // }
  if (!token || token === "null") {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId); 
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};

// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     next();
//   };
// };
