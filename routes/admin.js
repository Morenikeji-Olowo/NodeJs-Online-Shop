import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import productsController from "../controllers/products.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminRouter = express.Router();


adminRouter.get("/add-product", productsController.getAddProduct);

adminRouter.post("/add-product", productsController.postAddProduct);

export  { adminRouter};
