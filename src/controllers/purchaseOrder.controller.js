import PurchaseOrder from "../models/PurchaseOrder";

export default class PurchaseOrderController {
  async createPurchaseOrder(req, res) {
    try {
      const { id } = req.params;
      const allPurchaseOrders = await PurchaseOrder.find({
        order: id,
      }).sort("po_number");
      const lastPurchaseOrder = allPurchaseOrders[allPurchaseOrders.length - 1];
      const poNumber = lastPurchaseOrder ? lastPurchaseOrder.po_number + 1 : 1;
      const purchaseOrder = await PurchaseOrder.create({
        order: id,
        po_number: poNumber,
      });
      return res.status(201).json({
        data: purchaseOrder,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to create purchase order",
      });
    }
  }

  async getPurchaseOrder(req, res) {
    try {
      const purchaseOrder = await PurchaseOrder.findById(
        req.params.id
      ).populate("order");
      return res.status(200).json({
        data: purchaseOrder,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to get purchase order",
      });
    }
  }

  async getPurchaseOrders(req, res) {
    try {
      const { id } = req.params;
      const purchaseOrders = await PurchaseOrder.find({
        order: id,
      })
        .populate("order")
        .sort("po_number");
      return res.status(200).json({
        data: purchaseOrders,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to get purchase orders",
      });
    }
  }

  async deletePurchaseOrder(req, res) {
    try {
      const { purchaseOrderId } = req.params;
      const po = await PurchaseOrder.findByIdAndDelete(purchaseOrderId);
      if (!po) {
        return res.status(404).json({
          error: "Purchase order not found",
        });
      }
      return res.status(200).json({
        message: "Purchase order deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        message: "Failed to delete purchase order",
      });
    }
  }
}
