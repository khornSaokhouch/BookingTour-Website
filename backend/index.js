// Express Backend
import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./database/db.js";
import authRoutes from "./routes/auth-route.js";
import locationRoute from "./routes/loaction-route.js";


dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve("uploads")));

connectToDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoute);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});