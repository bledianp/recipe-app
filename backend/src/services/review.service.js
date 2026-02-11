import Review from "../models/Review.js";

const createReview = async (userId, recipeId, reviewData) => {
  const existingReview = await Review.findOne({
    user: userId,
    recipe: recipeId,
  });
  if (existingReview) {
    throw new Error("You have already reviewed this recipe");
  }

  const review = new Review({
    ...reviewData,
    user: userId,
    recipe: recipeId,
  });

  await review.save();
  return review;
};

const getReviewsByRecipe = async (recipeId) => {
  return await Review.find({ recipe: recipeId }).populate(
    "user",
    "fullName avatar"
  );
};

const getReviewById = async (id) => {
  return await Review.findById(id).populate("user", "fullName avatar");
};

const updateReview = async (id, userId, updateData) => {
  const review = await Review.findOneAndUpdate(
    { _id: id, user: userId },
    { $set: updateData },
    { new: true }
  );
  return review;
};

const deleteReview = async (id, userId) => {
  const review = await Review.findOneAndDelete({ _id: id, user: userId });
  return review;
};

export default {
  createReview,
  getReviewsByRecipe,
  getReviewById,
  updateReview,
  deleteReview,
};
