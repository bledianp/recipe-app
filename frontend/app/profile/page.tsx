"use client";

import { useEffect, useState, ChangeEvent } from "react";
import {
  getMyProfile,
  updateProfile,
  createProfile,
  deleteProfile,
} from "@/src/services/profileService";
import toast from "react-hot-toast";
import { logout } from "@/src/lib/auth";

type Profile = {
  fullName: string;
  avatar?: string;
  bio?: string;
  age?: number;
  location?: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    avatar: "",
    bio: "",
    age: 0,
    location: "",
  });
  const [originalProfile, setOriginalProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [exists, setExists] = useState(false);


  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfile();
        setProfile(res.data);
        setOriginalProfile(res.data); // Save original values for cancel
        setExists(true);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setExists(false);
        } else {
          console.error(err);
          logout(); // invalid token
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  // Save profile (create or update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (exists) {
        await updateProfile(profile);
      } else {
        await createProfile(profile);
        setExists(true);
      }
      toast.success("Profile saved successfully!");
      setOriginalProfile(profile);
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Error saving profile");
    }
  };

  // Cancel edits and restore original profile
  const handleCancel = () => {
    if (originalProfile) setProfile(originalProfile);
    setEditing(false);
  };

  // Delete profile
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your profile?")) return;
    try {
      await deleteProfile();
      toast.success("Profile deleted successfully!");
      setProfile({ fullName: "", avatar: "", bio: "", age: 0, location: "" });
      setOriginalProfile(null);
      setExists(false);
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Error deleting profile");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      {!editing ? (
        <div className="flex flex-col gap-2">
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover mb-2"
            />
          )}
          <p>
            <strong>Full Name:</strong> {profile.fullName}
          </p>
          <p>
            <strong>Bio:</strong> {profile.bio}
          </p>
          <p>
            <strong>Age:</strong> {profile.age}
          </p>
          <p>
            <strong>Location:</strong> {profile.location}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit Profile
            </button>
            {exists && (
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete Profile
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={handleChange}
            className="border p-2"
            required
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar URL"
            value={profile.avatar || ""}
            onChange={handleChange}
            className="border p-2"
          />
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt="Avatar preview"
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
          <textarea
            name="bio"
            placeholder="Bio"
            value={profile.bio || ""}
            onChange={handleChange}
            className="border p-2"
            maxLength={500}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={profile.age || 0}
            onChange={handleChange}
            className="border p-2"
            min={0}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={profile.location || ""}
            onChange={handleChange}
            className="border p-2"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white p-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}