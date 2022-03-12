import PurchaseOrder from "../models/PurchaseOrder";

export default class PurchaseOrderController {
  async createPurchaseOrder(req, res) {
    const { id } = req.params;
    try {
      const allPurchaseOrders = await PurchaseOrder.find();
      const purchaseOrder = await PurchaseOrder.create({
        order: id,
        po_number: allPurchaseOrders.length + 1,
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
      const purchaseOrders = await PurchaseOrder.find().populate("order");
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
