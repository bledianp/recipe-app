import express from "express";
import userController from "../controllers/user.controller.js";
import { validateRegister, validateLogin } from "../middleware/validators.js";
const route = express.Router();

route.post("/register", validateRegister, userController.register);
route.post("/login", validateLogin, userController.login);
route.get("/currentUser", userController.getCurrentUser);

export default route;
