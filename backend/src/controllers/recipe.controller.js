import RecipeService from "../services/recipe.service.js";

const getRecipes = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipes = await RecipeService.getRecipesByUser(userId);
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createRecipe = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipeData = req.body;
    const newRecipe = await RecipeService.createRecipe(userId, recipeData);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipe = await RecipeService.getRecipeById(req.params.id, userId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedRecipe = await RecipeService.updateRecipe(req.params.id, userId, req.body);
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found or not authorized" });
    }
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const userId = req.user.id;
    const deletedRecipe = await RecipeService.deleteRecipe(req.params.id, userId);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found or not authorized" });
    }

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
