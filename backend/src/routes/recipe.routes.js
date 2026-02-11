import express from "express";
import RecipeService from "../controllers/recipe.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", RecipeService.getRecipes);
router.post("/", RecipeService.createRecipe);
router.get("/:id", RecipeService.getRecipeById);
router.put("/:id", RecipeService.updateRecipe);
router.delete("/:id", RecipeService.deleteRecipe);

export default router;