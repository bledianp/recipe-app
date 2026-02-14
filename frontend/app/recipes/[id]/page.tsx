"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/src/lib/axios";
import {
  deleteRecipe,
  getRecipeById,
  updateRecipe,
} from "@/src/services/recipeService";
import toast from "react-hot-toast";

type Review = { user: string; rating: number; comment?: string };

type Recipe = {
  _id: string;
  title: string;
  image?: string;
  ingredients?: string[];
  instructions?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  tags?: string[];
  favorites?: string[];
  reviews?: Review[];
  isOwner?: boolean;
};

export default function RecipeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const recipeId = params.id as string;

  const [recipe, setRecipe] = useState<Recipe>({
    _id: "",
    title: "",
    image: "",
    ingredients: [],
    instructions: "",
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    tags: [],
    favorites: [],
    reviews: [],
    isOwner: true,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await getRecipeById(recipeId);
        setRecipe({
          _id: res.data._id || "",
          title: res.data.title || "",
          image: res.data.image || "",
          ingredients: res.data.ingredients || [],
          instructions: res.data.instructions || "",
          prepTime: res.data.prepTime ?? 0,
          cookTime: res.data.cookTime ?? 0,
          servings: res.data.servings ?? 1,
          tags: res.data.tags || [],
          favorites: res.data.favorites || [],
          reviews: res.data.reviews || [],
          isOwner: res.data.isOwner ?? false,
        });
      } catch (err) {
        console.error(err);
        toast.error("Error fetching recipe");
        
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId, router]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]:
        name === "prepTime" || name === "cookTime" || name === "servings"
          ? Number(value)
          : value,
    }));
  };

  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "tags" | "ingredients"
  ) => {
    const values = e.target.value.split(",").map((v) => v.trim());
    setRecipe((prev) => ({ ...prev, [field]: values }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateRecipe(recipe._id, recipe);
      toast.success("Recipe updated!");
    } catch (err) {
      console.error(err);
      toast.error("Error updating recipe");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await deleteRecipe(recipe._id);
      toast.success("Recipe deleted!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting recipe");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={recipe.title}
          onChange={handleChange}
          className="border p-2"
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="image"
          value={recipe.image}
          onChange={handleChange}
          className="border p-2"
          placeholder="Image URL"
        />
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={recipe.ingredients?.join(", ") || ""}
          onChange={(e) => handleArrayChange(e, "ingredients")}
          className="border p-2"
        />
        <textarea
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          placeholder="Instructions"
          className="border p-2"
          rows={4}
        />
        <input
          type="number"
          name="prepTime"
          value={recipe.prepTime}
          onChange={handleChange}
          className="border p-2"
          placeholder="Prep Time (min)"
          min={0}
        />
        <input
          type="number"
          name="cookTime"
          value={recipe.cookTime}
          onChange={handleChange}
          className="border p-2"
          placeholder="Cook Time (min)"
          min={0}
        />
        <input
          type="number"
          name="servings"
          value={recipe.servings}
          onChange={handleChange}
          className="border p-2"
          placeholder="Servings"
          min={1}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={recipe.tags?.join(", ") || ""}
          onChange={(e) => handleArrayChange(e, "tags")}
          className="border p-2"
        />

        <div className="flex gap-2 mt-2">
          <button type="submit" className="bg-green-600 text-white p-2 rounded">
            Save
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
          </button>
        </div>
      </form>

      {recipe.reviews && recipe.reviews.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Reviews</h2>
          <ul className="list-disc ml-5">
            {recipe.reviews.map((r, i) => (
              <li key={i}>
                <strong>Rating:</strong> {r.rating} - {r.comment}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
