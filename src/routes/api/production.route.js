import express from "express";
import ProductionController from "../../controllers/production.controller";
import { checkOrderExists } from "../../middlewares/order.middleware";
import productionValidation from "../../validations/production.validation";
import { checkProductionExists } from "../../middlewares/production.middleware";
import { checkPurchaseOrderNumber } from "../../middlewares/purchaseOrder.middleware";

const productionRouter = express.Router();
const productionController = new ProductionController();

productionRouter
  .route("/")
  .post(
    productionValidation,
    checkPurchaseOrderNumber,
    productionController.createProduction
  )
  .get(productionController.getAllProduction);

productionRouter
  .route("/:id")
  .get(checkProductionExists, productionController.getOneProduction)
  .patch(checkProductionExists, productionController.updateProduction)
  .delete(checkProductionExists, productionController.deleteProduction);

export default productionRouter;
