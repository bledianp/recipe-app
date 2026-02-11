import Favorite from "../models/Favorite.js";

const addFavorite = async (userId, recipeId) => {
  const existingFavorite = await Favorite.findOne({
    user: userId,
    recipe: recipeId,
  });
  if (existingFavorite) {
    throw new Error("Recipe already in favorites");
  }

  const favorite = new Favorite({ user: userId, recipe: recipeId });
  await favorite.save();
  return favorite;
};

const getFavoritesByUser = async (userId) => {
  return await Favorite.find({ user: userId }).populate("recipe", "title image");
};

const removeFavorite = async (userId, recipeId) => {
  const deleted = await Favorite.findOneAndDelete({user: userId, recipe: recipeId});
  return deleted;
};

const isFavorite = async (userId, recipeId) => {
  const fav = await Favorite.findOne({ user: userId, recipe: recipeId });
  return !!fav;
};

export default {
  addFavorite,
  getFavoritesByUser,
  removeFavorite,
  isFavorite,
};
