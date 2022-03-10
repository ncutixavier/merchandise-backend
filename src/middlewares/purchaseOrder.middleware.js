import PurchaseOrder from "../models/PurchaseOrder";

export const checkPurchaseOrderExists = async (req, res, next) => {
  try {
    const { purchaseOrderId } = req.params;
    const purchaseOrder = await PurchaseOrder.findById(purchaseOrderId);
    if (!purchaseOrder) {
      return res.status(404).json({
        message: "Purchase order not found",
      });
    }
    req.purchaseOrder = purchaseOrder;
    return next();
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Failed to check purchase order",
    });
  }
};
