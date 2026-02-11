import express from "express";
import ReviewController from "../controllers/review.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", ReviewController.createReview);
router.get("/recipe/:recipeId", ReviewController.getReviewsByRecipe);
router.get("/:id", ReviewController.getReviewById);
router.put("/:id", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);

export default router;