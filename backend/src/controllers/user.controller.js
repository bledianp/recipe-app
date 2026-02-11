import userService from "../services/user.service.js";

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.register(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Could not register" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await userService.findUser(email);
    if (!userExists) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const user = await userService.login(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

const getCurrentUser = async (req, res) => {
  const token = req.header("Bearer");
  try {
    const currentUser = await userService.findCurrentUser(token);
    res.status(200).json(currentUser);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch current user" });
  }
};

export default {
  register,
  login,
  getCurrentUser
};
