import express from "express";
import sampleRouter from "./api/sample.route";
import orderRouter from "./api/order.route";
import productionRouter from "./api/production.route";

const routes = express.Router();

routes.use("/samples", sampleRouter);
routes.use("/orders", orderRouter);
routes.use("/productions", productionRouter);

export default routes;
