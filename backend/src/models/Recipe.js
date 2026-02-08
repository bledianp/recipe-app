import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    ingredients: {
      type: [String],
      required: true
    },
    instructions: {
      type: String,
      required: true
    },
    prepTime: {
      type: Number
    },
    cookTime: {
      type: Number
    },
    servings: {
      type: Number
    },
    tags: [String],
    image: {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
