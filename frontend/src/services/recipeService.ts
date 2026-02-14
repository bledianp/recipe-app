import { api } from "@/src/lib/axios";

export type Recipe = {
  _id?: string;
  title: string;
  image?: string;
  ingredients?: string[];
  instructions?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  tags?: string[];
};

export const getAllRecipes = () => {
  return api.get("/recipes");
};

export const getRecipeById = (id: string) => {
  return api.get(`/recipes/${id}`);
};

export const createRecipe = (recipe: Recipe) => {
  return api.post("/recipes", recipe);
};

export const updateRecipe = (id: string, recipe: Recipe) => {
  return api.put(`/recipes/${id}`, recipe);
};

export const deleteRecipe = (id: string) => {
  return api.delete(`/recipes/${id}`);
};
