import FavoriteService from "../services/favorite.service.js";

const addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.body;

    if (!recipeId) {
        return res.status(400).json({ message: "Recipe ID is required" });
    }

    const favorite = await FavoriteService.addFavorite(userId, recipeId);
    res.status(201).json(favorite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await FavoriteService.getFavoritesByUser(userId);
    res.status(200).json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.body;

    if (!recipeId) {
        return res.status(400).json({ message: "Recipe ID is required" });
    }

    const deleted = await FavoriteService.removeFavorite(userId, recipeId);
    if (!deleted) {
        return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const checkFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;
    const favorited = await FavoriteService.isFavorite(userId, recipeId);
    res.status(200).json({ favorited });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  addFavorite,
  getFavorites,
  removeFavorite,
  checkFavorite,
};
