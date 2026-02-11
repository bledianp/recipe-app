import Recipe from "../models/Recipe.js";

const createRecipe = async (userId, recipeData) => {
  try {
    const newRecipe = new Recipe({
      ...recipeData,
      createdBy: userId,
    });
    await newRecipe.save();
    return newRecipe;
  } catch (err) {
    throw err;
  }
};

const getRecipesByUser = async (userId) => {
  try {
    const recipes = await Recipe.find({ createdBy: userId });
    return recipes;
  } catch (err) {
    throw err;
  }
};

const getRecipeById = async (id, userId = null) => {
  try {
    const query = { _id: id };
    if (userId) query.createdBy = userId;
    const recipe = await Recipe.findOne(query);
    return recipe;
  } catch (err) {
    throw err;
  }
};

const updateRecipe = async (id, userId, updateData) => {
  try {
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: id, createdBy: userId },
      { $set: updateData },
      { new: true }
    );
    return updatedRecipe;
  } catch (err) {
    throw err;
  }
};

const deleteRecipe = async (id, userId) => {
  return await Recipe.findOneAndDelete({ _id: id, createdBy: userId });
};

export default {
  createRecipe,
  getRecipesByUser,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};
