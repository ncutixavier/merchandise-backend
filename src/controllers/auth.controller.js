import User from "../models/User";
import jwt from "jsonwebtoken";

export default class AuthController {
  async googleAuth(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({
          message: "Authentication failed, user not found",
        });
      }
      const user = await User.findOne({ googleId: req.user.id });
      await User.findByIdAndUpdate(user._id, { isLoggedIn: true });
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET
      );
      return res.status(200).json({
        message: "Login successful",
        token,
        user,
      });
    } catch (error) {
      error: error.message;
      message: "Error occured while logging in, please try again";
    }
  }

  async logout(req, res) {
    try {
      const user = await User.findById(req.user.id);
      await User.findByIdAndUpdate(user._id, { isLoggedIn: false });
      req.logout();
      return res.status(200).json({
        message: "Logout successful",
      });
    } catch (error) {
      error: error.message;
      message: "Error occured while logging out, please try again";
    }
  }
}
