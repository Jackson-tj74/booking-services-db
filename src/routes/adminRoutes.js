
import express from "express";
import { registerAdmin, loginAdmin, getAllBookings, deleteBooking } from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";
import { EmailExist } from "../middleware/validation.js";

const router = express.Router();


router.post("/register",EmailExist, registerAdmin);
router.post("/login", loginAdmin);


router.get("/bookings", verifyAdmin, getAllBookings);
router.delete("/bookings/:id", verifyAdmin, deleteBooking);

export default router;
