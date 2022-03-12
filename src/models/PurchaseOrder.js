import mongoose from "mongoose";

const schema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  po_number: {
    type: Number,
    required: [true, "Purchase Order must have ID"],
  }
});

export default mongoose.model("PurchaseOrder", schema);
