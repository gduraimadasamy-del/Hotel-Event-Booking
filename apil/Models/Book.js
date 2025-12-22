// models/Book.js
import mongoose from "mongoose";
const { Schema } = mongoose;
const BookingSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  name: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
});
export default mongoose.model("Book", BookingSchema);