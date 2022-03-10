import mongoose from "mongoose";

const schema = mongoose.Schema({
  purchaseOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseOrder",
  },
  image: {
    type: String,
    required: [true, "Style must have a report"],
  }
});

export default mongoose.model("Style", schema);
