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
      await PurchaseOrder.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        data: {},
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}
