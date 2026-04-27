import { Router } from "express";
import authController from "../controllers/auth.js";

const authRouter = Router();
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

authRouter.get("/signup", authController.getSignUp);
authRouter.post("/signup", authController.postSignUp);

authRouter.post("/logout", authController.postLogout);


export default authRouter;