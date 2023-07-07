import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: false,
  },
  password: { type: String, required: true, trim: true, minlength: 6 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.index({ email: 1 });

UserSchema.index({ createdAt: 1 });

export default mongoose.model("Users", UserSchema);
