import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from './routes/user.routes.js'
import recipeRoutes from './routes/recipe.routes.js'
import profileRoutes from './routes/profile.route.js'
import reviewRoutes from "./routes/review.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json());
app.use('/api/user', userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/favorites", favoriteRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);