import mongoose from "mongoose";

const schema = mongoose.Schema({
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseOrder",
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  image: {
    type: String,
    required: [true, "Style must have a report"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Style", schema);
