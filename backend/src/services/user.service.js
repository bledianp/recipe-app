import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
const register = async (email, password) => {
  try {
    const userRegister = await User.findOne({ email: email });
    if (userRegister) {
      throw new Error("This user exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);

    const newUser = new User({
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  } catch (err) {
    return err;
  }
};
const login = async (email, password) => {
  const user = await findUser(email);
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = generateToken(user._id);
  return {
    user: user,
    accessToken: token,
  };
};

const findUser = async (email) => {
  const user = User.findOne({ email: email });
  return user;
};

const findCurrentUser = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  const userCurrent = await User.findOne({ _id: userId }).select("-password");
  if (!userCurrent) {
    throw new Error("User not found");
  }
  return userCurrent;
};

export default {
  register,
  findUser,
  login,
  findCurrentUser,
};
