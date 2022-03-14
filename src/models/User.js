import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    default: "merchandise",
  },
  googleId: {
    type: String,
  },
  photo: {
    type: String,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", schema);
