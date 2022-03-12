import PurchaseOrder from "../models/PurchaseOrder";

export const checkPurchaseOrderExists = async (req, res, next) => {
  try {
    const { purchaseOrderId } = req.params;
    const { purchaseOrder } = req.body;
    const purchaseOrderExist = await PurchaseOrder.findById(
      purchaseOrderId || purchaseOrder
    );
    if (!purchaseOrderExist) {
      return res.status(404).json({
        message: "Purchase order not found",
      });
    }
    req.purchaseOrder = purchaseOrderExist;
    return next();
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Failed to check purchase order",
    });
  }
};

export const checkPurchaseOrderNumber = async (req, res, next) => {
  const { po } = req.query;
  const { id } = req.params;
  const purchaseOrder = await PurchaseOrder.findOne({
    po_number: po,
    _id: { $ne: id },
  });
  if (!purchaseOrder) {
    return res.status(404).json({
      message: "Purchase order has not been found",
    });
  }
  req.purchaseOrder = purchaseOrder;
  return next();
};

export const checkPurchaseOrderNumberExists = async (req, res, next) => {
  const { purchaseOrder } = req.body;
  const purchaseOrderExist = await PurchaseOrder.findOne({
    po_number: purchaseOrder,
  });
  if (!purchaseOrderExist) {
    return res.status(404).json({
      message: "Purchase order has not been found",
    });
  }
  req.purchaseOrder = purchaseOrderExist;
  return next();
};
