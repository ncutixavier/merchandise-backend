import express from "express";
import SampleController from "../../controllers/sample.controller";
import {
  uploadFile,
  removeSampleFile,
} from "../../middlewares/uploadFile.middleware";
import "dotenv/config";

const sampleRouter = express.Router();
const sampleController = new SampleController();

sampleRouter
  .route("/")
  .get(sampleController.getAllSamples)
  .post(uploadFile, sampleController.createSample);

sampleRouter
  .route("/:id")
  .get(sampleController.getSampleById)
  .patch(sampleController.updateSample)
  .delete(removeSampleFile, sampleController.deleteSample);

export default sampleRouter;
