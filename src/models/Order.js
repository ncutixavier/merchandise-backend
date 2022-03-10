import mongoose from "mongoose";

const schema = mongoose.Schema({
  buyer: {
    type: String,
    required: [true, "Order must have a buyer"],
  },
  quantity: {
    type: String,
    required: [true, "Order must have a style number"],
  },
  colors: {
    type: Array,
    required: [true, "Order must have colors"],
  },
  created_date: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Order", schema);
