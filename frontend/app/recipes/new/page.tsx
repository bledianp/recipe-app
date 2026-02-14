"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/src/lib/axios";
import toast from "react-hot-toast";

export default function NewRecipePage() {
  const router = useRouter();

  // Initial blank recipe state
  const [recipe, setRecipe] = useState({
    title: "",
    image: "",
    ingredients: [] as string[],
    instructions: "",
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    tags: [] as string[],
  });

  // Handle text input changes
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

  // Handle comma-separated fields (ingredients, tags)
  const handleArrayChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: "ingredients" | "tags"
  ) => {
    const values = e.target.value.split(",").map((v) => v.trim());
    setRecipe((prev) => ({ ...prev, [field]: values }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/recipes", recipe);
      toast.success("Recipe created successfully!");
      router.push("/"); // Redirect to list
    } catch (err) {
      console.error(err);
      toast.error("Failed to create recipe");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Recipe</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={recipe.title}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={recipe.image}
          onChange={handleChange}
          className="border p-2"
        />
        {recipe.image && (
          <img
            src={recipe.image}
            alt="Preview"
            className="w-full h-48 object-cover rounded"
          />
        )}
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={recipe.ingredients.join(", ")}
          onChange={(e) => handleArrayChange(e, "ingredients")}
          className="border p-2"
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={recipe.instructions}
          onChange={handleChange}
          className="border p-2"
          rows={4}
          required
        />
        <input
          type="number"
          name="prepTime"
          placeholder="Prep Time (minutes)"
          value={recipe.prepTime}
          onChange={handleChange}
          className="border p-2"
          min={0}
        />
        <input
          type="number"
          name="cookTime"
          placeholder="Cook Time (minutes)"
          value={recipe.cookTime}
          onChange={handleChange}
          className="border p-2"
          min={0}
        />
        <input
          type="number"
          name="servings"
          placeholder="Servings"
          value={recipe.servings}
          onChange={handleChange}
          className="border p-2"
          min={1}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={recipe.tags.join(", ")}
          onChange={(e) => handleArrayChange(e, "tags")}
          className="border p-2"
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Create Recipe
        </button>
      </form>
    </div>
  );
}
