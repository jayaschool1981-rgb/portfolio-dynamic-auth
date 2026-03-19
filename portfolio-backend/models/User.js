import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ changed
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // ✅ changed
});

export default mongoose.model("User", userSchema);