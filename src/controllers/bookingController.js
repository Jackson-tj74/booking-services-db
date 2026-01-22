
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import sendBookingEmail from "../utils/sendEmail.js";

//  CREATE BOOKING + SEND EMAIL
export const createBooking = async (req, res) => {
  try {
    const { serviceName, servicePrice, contact, notes } = req.body;

    if (!serviceName || !servicePrice || !contact) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const booking = await Booking.create({
      userId: user._id,
      serviceName,
      servicePrice,
      customerName: user.name,
      customerEmail: user.email,
      contact,
      notes,
    });

    //  SEND EMAIL
    await sendBookingEmail({
      to: user.email,
      name: user.name,
      service: serviceName,
      price: servicePrice,
    });

    res.status(201).json({
      message: "Booking created and email sent successfully",
      booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//  GET MY BOOKINGS
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

//  DELETE BOOKING
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
