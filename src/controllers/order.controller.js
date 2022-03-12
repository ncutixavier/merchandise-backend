import Order from "../models/Order";

export default class OrderController {
  async getOrders(req, res) {
    try {
      const orders = await Order.find({}).sort("buyer");
      res.status(200).json({
        data: orders,
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Failed to get orders",
      });
    }
  }

  async getOrder(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      res.status(200).json({
        data: order,
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Failed to get order",
      });
    }
  }

  async createOrder(req, res) {
    try {
      const order = await Order.create(req.body);
      res.status(201).json({
        data: order,
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Failed to create order",
      });
    }
  }

  async updateOrder(req, res) {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        data: order,
        message: "Order updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Failed to update order",
      });
    }
  }

  async deleteOrder(req, res) {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "Order deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Failed to delete order",
      });
    }
  }
}
