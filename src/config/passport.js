var GoogleStrategy = require("passport-google-oauth20").Strategy;
import passport from "passport";
import User from "../models/User";
import "dotenv/config";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/v1/auth/google/callback",
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          console.log("User already exists in our DB::", user);
          return cb(null, user);
        } else {
          const newUser = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
            email: profile.emails[0].value,
            isLoggedIn: false,
          });
          console.log("New User Created::", newUser);
          return cb(null, newUser);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.log(error);
  }
});

export default passport;
