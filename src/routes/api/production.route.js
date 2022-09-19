import express from "express";
import ProductionController from "../../controllers/production.controller";
import { checkOrderExists } from "../../middlewares/order.middleware";
import productionValidation from "../../validations/production.validation";
import { checkProductionExists } from "../../middlewares/production.middleware";
import { checkPurchaseOrderNumber } from "../../middlewares/purchaseOrder.middleware";
import { restrictTo, protectRoute } from "../../middlewares/protectRoute";

const productionRouter = express.Router();
const productionController = new ProductionController();

productionRouter
  .route("/")
  .post(
    protectRoute,
    restrictTo("admin"),
    productionValidation,
    checkPurchaseOrderNumber,
    productionController.createProduction
  )
  .get(productionController.getAllProduction);

productionRouter
  .route("/:id")
  .get(checkProductionExists, productionController.getOneProduction)
  .patch(
    protectRoute,
    restrictTo("admin"),
    checkProductionExists,
    productionController.updateProduction
  )
  .delete(
    protectRoute,
    restrictTo("admin"),
    checkProductionExists,
    productionController.deleteProduction
  );

export default productionRouter;
