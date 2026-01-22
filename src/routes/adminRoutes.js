
import express from "express";
import { registerAdmin, loginAdmin, getAllBookings, deleteBooking } from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);


router.get("/bookings", verifyAdmin, getAllBookings);
router.delete("/bookings/:id", verifyAdmin, deleteBooking);

export default router;
