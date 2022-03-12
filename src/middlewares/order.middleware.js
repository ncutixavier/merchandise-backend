import Order from "../models/Order";

export const checkOrderDuplicate = async (req, res, next) => {
  const { buyer } = req.body;
  const order = await Order.findOne({
    buyer: { $regex: buyer, $options: "i" },
  });
  if (order) {
    return res.status(409).json({
      message: "Order already exists",
    });
  }
  return next();
};

export const checkOrderExists = async (req, res, next) => {
  try {
    const { order } = req.body;
    const { id } = req.params;
    const orderExist = await Order.findById(id || order || req.query.order);
    if (!orderExist) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    req.order = orderExist;
    return next();
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Failed to check order",
    });
  }
};
