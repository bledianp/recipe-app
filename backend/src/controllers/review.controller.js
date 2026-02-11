import ReviewService from "../services/review.service.js";

const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId, rating, comment } = req.body;
    const review = await ReviewService.createReview(userId, recipeId, {
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getReviewsByRecipe = async (req, res) => {
  try {
    const reviews = await ReviewService.getReviewsByRecipe(req.params.recipeId);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await ReviewService.getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedReview = await ReviewService.updateReview(
      req.params.id,
      userId,
      req.body
    );
    if (!updatedReview) {
      return res
        .status(404)
        .json({ message: "Review not found or not authorized" });
    }
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const deletedReview = await ReviewService.deleteReview(
      req.params.id,
      userId
    );
    if (!deletedReview) {
      return res
        .status(404)
        .json({ message: "Review not found or not authorized" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  createReview,
  getReviewsByRecipe,
  getReviewById,
  updateReview,
  deleteReview,
};
