import express from "express";
import OrderController from "../../controllers/order.controller";
import PurchaseOrderController from "../../controllers/purchaseOrder.controller";
import StyleController from "../../controllers/style.controller";
import orderValidation from "../../validations/order.validation";
import {
  checkOrderDuplicate,
  checkOrderExists,
} from "../../middlewares/order.middleware";
import { checkPurchaseOrderExists } from "../../middlewares/purchaseOrder.middleware";
import {
  uploadFile,
  removeStyleFile,
} from "../../middlewares/uploadFile.middleware";
import "dotenv/config";

const orderRouter = express.Router();
const orderController = new OrderController();
const purchaseOrderController = new PurchaseOrderController();
const styleController = new StyleController();

orderRouter
  .route("/")
  .get(orderController.getOrders)
  .post(orderValidation, checkOrderDuplicate, orderController.createOrder);

orderRouter
  .route("/:id")
  .get(checkOrderExists, orderController.getOrder)
  .patch(checkOrderExists, orderController.updateOrder)
  .delete(checkOrderExists, orderController.deleteOrder);

orderRouter
  .route("/:id/purchaseOrder")
  .post(checkOrderExists, purchaseOrderController.createPurchaseOrder)
  .get(checkOrderExists, purchaseOrderController.getPurchaseOrders);

orderRouter
  .route("/:id/purchaseOrder/:purchaseOrderId")
  .get(checkOrderExists, purchaseOrderController.getPurchaseOrder)
  .delete(checkOrderExists, purchaseOrderController.deletePurchaseOrder);

orderRouter
  .route("/:purchaseOrderId/style")
  .post(checkPurchaseOrderExists, uploadFile, styleController.createStyle)
  .get(checkPurchaseOrderExists, styleController.getStyles)

orderRouter
  .route("/:purchaseOrderId/style/:styleId")
  .get(checkPurchaseOrderExists, styleController.getStyle)
  .delete(
    checkPurchaseOrderExists,
    removeStyleFile,
    styleController.deleteStyle
  );

export default orderRouter;
