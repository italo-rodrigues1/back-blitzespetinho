import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {
    type: String,
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

CategorySchema.index({ name: 1 });

CategorySchema.index({ createdAt: 1 });

export default mongoose.model("Categorys", CategorySchema);
