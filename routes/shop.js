import express from "express";
import productsController from "../controllers/products.js";

const shopRouter = express.Router();

shopRouter.get("/", productsController.getProducts);

export default shopRouter;
