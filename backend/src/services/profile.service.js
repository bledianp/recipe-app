import Profile from "../models/Profile.js";

const createProfile = async (userId, profileData) => {
  const existingProfile = await Profile.findOne({ user: userId });
  if (existingProfile) {
    throw new Error("Profile already exists for this user");
  }

  const profile = new Profile({
    ...profileData,
    user: userId,
  });

  await profile.save();
  return profile;
};

const getProfileByUser = async (userId) => {
  return await Profile.findOne({ user: userId });
};

const getProfileById = async (id) => {
  return await Profile.findById(id).populate("user", "email");
};

const updateProfile = async (userId, updateData) => {
  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    { $set: updateData },
    { new: true }
  );
  return profile;
};

const deleteProfile = async (userId) => {
  const profile = await Profile.findOneAndDelete({ user: userId });
  return profile;
};

export default {
  createProfile,
  getProfileByUser,
  getProfileById,
  updateProfile,
  deleteProfile,
};
