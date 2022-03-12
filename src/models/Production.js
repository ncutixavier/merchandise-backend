import mongoose from "mongoose";

const schema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  input: {
    type: String,
    required: [true, "Production must have an input"],
  },
  output: {
    type: String,
    required: [true, "Production must have an output"],
  },
  packed: {
    type: String,
    required: [true, "Production must have an packed status"],
  },
  created_date: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Production", schema);
