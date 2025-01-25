import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      default: false,
    },
    tax: {
      type: Number,
      required: function () {
        return this.taxApplicability;
      },
      min: 0,
      max: 100,
    },
    taxType: {
      type: String,
      enum: ["PERCENTAGE", "FIXED"],
      required: function () {
        return this.taxApplicability;
      },
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
