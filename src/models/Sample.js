import mongoose from "mongoose";

const schema = mongoose.Schema({
  image: {
    type: String,
    required: [true, "Sample must have a image"],
  },
  style_no: {
    type: String,
    required: [true, "Sample must have a style number"],
  },
  status: {
    type: String,
    required: [true, "Sample must have a status"],
    default: "pending",
  },
});

export default mongoose.model("Sample", schema);
