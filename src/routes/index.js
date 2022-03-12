import express from "express";
import sampleRouter from "./api/sample.route";
import orderRouter from "./api/order.route";
import productionRouter from "./api/production.route";
import styleRouter from "./api/style.route";

const routes = express.Router();

routes.use("/samples", sampleRouter);
routes.use("/orders", orderRouter);
routes.use("/productions", productionRouter);
routes.use("/styles", styleRouter);

export default routes;
