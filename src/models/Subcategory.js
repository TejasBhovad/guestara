v;

const subcategorySchema = new mongoose.Schema(
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
    },
    tax: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to inherit tax properties from category if not specified
subcategorySchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("categoryId")) {
    const Category = mongoose.model("Category");
    const parentCategory = await Category.findById(this.categoryId);

    if (parentCategory) {
      this.taxApplicability =
        this.taxApplicability ?? parentCategory.taxApplicability;
      this.tax = this.tax ?? parentCategory.tax;
    }
  }
  next();
});

export default mongoose.model("Subcategory", subcategorySchema);
