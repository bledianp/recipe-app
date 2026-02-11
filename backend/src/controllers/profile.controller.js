import ProfileService from "../services/profile.service.js";

const createProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profileData = req.body;
    const profile = await ProfileService.createProfile(userId, profileData);
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await ProfileService.getProfileByUser(userId);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProfileById = async (req, res) => {
  try {
    const profile = await ProfileService.getProfileById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedProfile = await ProfileService.updateProfile(userId, req.body);
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const deletedProfile = await ProfileService.deleteProfile(userId);
    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  createProfile,
  getMyProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
};
