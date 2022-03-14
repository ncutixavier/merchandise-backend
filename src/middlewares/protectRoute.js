import User from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const protectRoute = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }

  if (!token) {
    return next(
      res.status(401).json({
        message: "Please login, it seems you are not loged in",
      })
    );
  }

  try {
    // 2. Verifying Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Check if user still exists
    const freshUser = await User.findById(decoded.id);
    console.log(freshUser);
    if (!freshUser.isLoggedIn) {
      return res.status(401).json({
        message: "Login session expired, please login again",
      });
    }
    req.user = freshUser;
    next();
  } catch (error) {
    console.log(error.message);
    return next(
      res.status(401).json({
        message: "Something went wrong, Please login to get access",
      })
    );
  }
};
