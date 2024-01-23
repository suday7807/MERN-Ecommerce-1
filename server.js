import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/produts", productRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Keep it up Uday",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} on http://localhost:${PORT}`
  );
});
