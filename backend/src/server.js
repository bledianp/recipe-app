import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from './routes/user.routes.js'
import recipeRoutes from './routes/recipe.routes.js'

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use("/api/recipes", recipeRoutes);

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);