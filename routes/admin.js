import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import adminController from "../controllers/admin.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adminRouter = express.Router();

// /admin/add-product => GET
adminRouter.get("/add-product", adminController.getAddProduct);

// /admin/add-product => POST
adminRouter.post("/add-product", adminController.postAddProduct);

// /admin/products => GET
adminRouter.get("/products", adminController.getProducts);
export  { adminRouter};
