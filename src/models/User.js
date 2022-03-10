import mongoose from "mongoose";

const schema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "merchandise",
  },
});

export default mongoose.model("User", schema);
