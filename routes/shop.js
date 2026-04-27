import express from "express";
import shopController from "../controllers/shop.js";
import { isAuth } from "../middleware/isAuth.js";

const shopRouter = express.Router();

// // shopRouter.get("/", shopController.getIndexPage);
shopRouter.get("/products", shopController.getProducts);
shopRouter.get("/products/:productId", shopController.getProduct);
shopRouter.get("/cart",isAuth, shopController.getCart)
shopRouter.post("/cart",isAuth, shopController.postCart)
shopRouter.get("/orders", isAuth, shopController.getOrders)
// // shopRouter.get("/checkout", shopController.getCheckout)
shopRouter.post("/cart-delete-item",isAuth, shopController.postCartDeleteProduct)
shopRouter.post("/create-order", isAuth, shopController.postOrder)

export default shopRouter;
