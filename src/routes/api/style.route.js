import express from "express";
import StyleController from "../../controllers/style.controller";
import {
  checkPurchaseOrderNumberExists,
  checkPurchaseOrderNumber,
} from "../../middlewares/purchaseOrder.middleware";
import {
  uploadNoMediaFile,
  removeStyleFile,
} from "../../middlewares/uploadFile.middleware";

const styleRouter = express.Router();
const styleController = new StyleController();

styleRouter
  .route("/")
  .post(
    checkPurchaseOrderNumberExists,
    uploadNoMediaFile,
    styleController.createStyle
  )
  .get(checkPurchaseOrderNumber, styleController.getStyles);

styleRouter
  .route("/:id")
  .get(styleController.getStyle)
  .delete(removeStyleFile, styleController.deleteStyle);

export default styleRouter;
