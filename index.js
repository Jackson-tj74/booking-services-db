
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./src/routes/userRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/user", userRoutes);
app.use("/bookings", bookingRoutes);
app.use("/admin", adminRoutes);
app.use("/contact", contactRoutes);
app.use("/message",contactRoutes);



mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.error(" DB connection error:", err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server running on port ${PORT}`)
);
