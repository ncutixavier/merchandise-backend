import express from "express";
// import passport from "passport";
import AuthController from "../../controllers/auth.controller";
import passport from "../../config/passport";

const userRoute = express.Router();
const authController = new AuthController();
import { protectRoute } from "../../middlewares/protectRoute";

userRoute.post(
  "/google",
  // passport.authenticate("google", { scope: ["profile", "email"] }),
  authController.googleAuth
);

userRoute.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.status(200).json({
      message: "Successful authenticated",
      user: req.user,
    });
  }
);

userRoute.post("/logout", protectRoute, authController.logout);

export default userRoute;
