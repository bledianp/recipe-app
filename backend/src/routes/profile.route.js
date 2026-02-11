import express from "express";
import ProfileController from "../controllers/profile.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", ProfileController.createProfile);
router.get("/me", ProfileController.getMyProfile);
router.get("/:id", ProfileController.getProfileById);
router.put("/", ProfileController.updateProfile);
router.delete("/", ProfileController.deleteProfile);

export default router;
