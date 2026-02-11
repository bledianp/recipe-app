import express from "express";
import FavoriteController from "../controllers/favorite.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect);
router.post("/", FavoriteController.addFavorite);
router.get("/", FavoriteController.getFavorites);
router.delete("/", FavoriteController.removeFavorite);
router.get("/:recipeId", FavoriteController.checkFavorite);

export default router;
