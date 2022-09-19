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
  uploadNoMediaFile,
  removeStyleFile,
} from "../../middlewares/uploadFile.middleware";
import "dotenv/config";
import { restrictTo, protectRoute } from "../../middlewares/protectRoute";

const orderRouter = express.Router();
const orderController = new OrderController();
const purchaseOrderController = new PurchaseOrderController();
const styleController = new StyleController();

orderRouter
  .route("/")
  .get(orderController.getOrders)
  .post(
    protectRoute,
    restrictTo("admin"),
    orderValidation,
    checkOrderDuplicate,
    orderController.createOrder
  );

orderRouter
  .route("/:id")
  .get(checkOrderExists, orderController.getOrder)
  .patch(
    protectRoute,
    restrictTo("admin"),
    checkOrderExists,
    orderController.updateOrder
  )
  .delete(
    protectRoute,
    restrictTo("admin"),
    checkOrderExists,
    orderController.deleteOrder
  );

orderRouter
  .route("/:id/purchaseOrder")
  .post(
    protectRoute,
    restrictTo("admin"),
    checkOrderExists,
    purchaseOrderController.createPurchaseOrder
  )
  .get(checkOrderExists, purchaseOrderController.getPurchaseOrders);

orderRouter
  .route("/:id/purchaseOrder/:purchaseOrderId")
  .get(checkOrderExists, purchaseOrderController.getPurchaseOrder)
  .delete(
    protectRoute,
    restrictTo("admin"),
    checkOrderExists,
    purchaseOrderController.deletePurchaseOrder
  );

orderRouter
  .route("/:purchaseOrderId/style")
  .post(
    protectRoute,
    restrictTo("admin"),
    checkPurchaseOrderExists,
    uploadNoMediaFile,
    styleController.createStyle
  )
  .get(checkPurchaseOrderExists, styleController.getStyles);

orderRouter
  .route("/:purchaseOrderId/style/:styleId")
  .get(checkPurchaseOrderExists, styleController.getStyle)
  .delete(
    protectRoute,
    restrictTo("admin"),
    checkPurchaseOrderExists,
    removeStyleFile,
    styleController.deleteStyle
  );

export default orderRouter;
