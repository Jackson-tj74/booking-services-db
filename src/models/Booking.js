
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceName: { type: String, required: true },
    servicePrice: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    contact: { type: String, required: true },
    notes: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    
    
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
