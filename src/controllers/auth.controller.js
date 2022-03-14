import User from "../models/User";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/jwt.utils";
import { OAuth2Client } from "google-auth-library";
import "dotenv/config";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default class AuthController {
  async googleAuth(req, res) {
    try {
      const { tokenId } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      let user = await User.findOne({ googleId: userid });
      if (user) {
        console.log("User already exists in our DB::", user);
        await User.findByIdAndUpdate(user._id, { isLoggedIn: true });
        return res.status(200).json({
          message: "Successful authenticated",
          token: generateToken({
            id: user._id,
            email: user.email,
            role: user.role,
          }),
          user: user,
        });
      }
      const newUser = await User.create({
        googleId: userid,
        name: payload.name,
        photo: payload.picture,
        email: payload.email,
        isLoggedIn: false,
      });
      await User.findByIdAndUpdate(newUser._id, { isLoggedIn: true });
      return res.status(200).json({
        message: "Successful authenticated",
        token: generateToken({
          id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        }),
        user: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error occured while logging in, please try again",
        error: error.message,
      });
    }
  }

  async logout(req, res) {
    try {
      const user = await User.findById(req.user.id);
      await User.findByIdAndUpdate(user._id, { isLoggedIn: false });
      return res.status(200).json({
        message: "Logout successful",
      });
    } catch (error) {
      error: error.message;
      message: "Error occured while logging out, please try again";
    }
  }
}
