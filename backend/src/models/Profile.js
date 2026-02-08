import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    age: {
      type: Number,
      min: 0,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
