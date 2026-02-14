"use client";

import { useState } from "react";

type Review = {
  user: string;
  rating: number;
  comment?: string;
};

type Recipe = {
  _id: string;
  title?: string;
  image?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  tags?: string[];
  favorites?: string[];
  reviews?: Review[];
  ingredients?: string[];
  instructions?: string;
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="border rounded shadow hover:shadow-lg cursor-pointer transition-all"
      onClick={() => setExpanded(!expanded)}
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

        {expanded && (
          <div className="mt-2 space-y-2">
            {recipe?.ingredients && (
              <div>
                <strong>Ingredients:</strong>
                <ul className="list-disc ml-5">
                  {recipe?.ingredients?.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}

            {recipe.instructions && (
              <p>
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
            )}

            <p>
              <strong>Prep Time:</strong> {recipe.prepTime ?? 0} min
            </p>
            <p>
              <strong>Cook Time:</strong> {recipe.cookTime ?? 0} min
            </p>
            <p>
              <strong>Servings:</strong> {recipe.servings ?? 1}
            </p>

            {recipe.tags && recipe.tags.length > 0 && (
              <p>
                <strong>Tags:</strong> {recipe.tags.join(", ")}
              </p>
            )}

            {recipe.reviews && recipe.reviews.length > 0 && (
              <div>
                <strong>Reviews ({recipe.reviews.length}):</strong>
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
        )}
      </div>
    </div>
  );
}
