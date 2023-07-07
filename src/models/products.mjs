import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    idCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      get: (v) => (v / 100).toFixed(2),
      set: (v) => v * 100,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { getters: true },
  }
);

ProductSchema.index({ name: 1 });

ProductSchema.index({ price: 1 });

ProductSchema.index({ category: 1 });

ProductSchema.index({ createdAt: 1 });

export default mongoose.model("Products", ProductSchema);
