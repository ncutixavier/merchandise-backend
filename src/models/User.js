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
});

export default mongoose.model("User", schema);
