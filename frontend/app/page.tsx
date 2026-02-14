"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllRecipes } from "@/src/services/recipeService";

type Recipe = {
  _id: string;
  title: string;
  image?: string;
  favorites?: string[];
  isOwner?: boolean;
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await getAllRecipes();
        setRecipes(
          (res.data || []).map((r: Recipe) => ({
            _id: r._id || "",
            title: r.title || "",
            image: r.image || "",
            favorites: r.favorites || [],
            isOwner: r.isOwner ?? false,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        className="flex items-center justify-center border rounded shadow cursor-pointer hover:shadow-lg text-3xl font-bold text-gray-500"
        style={{ height: "200px" }}
        onClick={() => router.push("/recipes/new")}
      >
        + New Recipe
      </div>

      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="border rounded shadow hover:shadow-lg cursor-pointer"
          onClick={() => router.push(`/recipes/${recipe._id}`)}
        >
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-t"
            />
          )}
          <div className="p-4">
            <h2 className="text-xl font-bold">{recipe.title}</h2>
            <p className="text-sm mt-1">❤️ {recipe.favorites?.length ?? 0}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
