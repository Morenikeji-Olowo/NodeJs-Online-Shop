import express from "express";
import shopController from "../controllers/shop.js";

const shopRouter = express.Router();

shopRouter.get("/", shopController.getIndexPage);
shopRouter.get("/products", shopController.getProducts);
shopRouter.get("/products/:productId", shopController.getProduct);
shopRouter.get("/cart", shopController.getCart)
shopRouter.post("/cart", shopController.postCart)
shopRouter.get("/orders", shopController.getOrders)
shopRouter.get("/checkout", shopController.getCheckout)
shopRouter.post("/cart-delete-item", shopController.postCartDeleteProduct)

export default shopRouter;
