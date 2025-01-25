import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    taxApplicability: {
      type: Boolean,
      required: true,
    },
    tax: {
      type: Number,
      required: function () {
        return this.taxApplicability;
      },
      min: 0,
      max: 100,
    },
    baseAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for total amount
itemSchema.virtual("totalAmount").get(function () {
  return this.baseAmount - this.discount;
});

// Index for search functionality
itemSchema.index({ name: "text" });

export default mongoose.model("Item", itemSchema);
