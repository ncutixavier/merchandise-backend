import express from "express";
import SampleController from "../../controllers/sample.controller";
import {
  uploadFile,
  removeSampleFile,
} from "../../middlewares/uploadFile.middleware";
import { restrictTo, protectRoute } from "../../middlewares/protectRoute";
import "dotenv/config";

const sampleRouter = express.Router();
const sampleController = new SampleController();

sampleRouter
  .route("/")
  .get(sampleController.getAllSamples)
  .post(
    protectRoute,
    restrictTo("admin"),
    uploadFile,
    sampleController.createSample
  );

sampleRouter
  .route("/:id")
  .get(sampleController.getSampleById)
  .patch(protectRoute, restrictTo("admin"), sampleController.updateSample)
  .delete(
    protectRoute,
    restrictTo("admin"),
    removeSampleFile,
    sampleController.deleteSample
  );

export default sampleRouter;
