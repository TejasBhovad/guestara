import Item from "../models/Item.js";

// Create item
export const createItem = async (req, res) => {
  try {
    const item = new Item({
      ...req.body,
      createdBy: "TejasBhovad",
      createdAt: "2025-01-25 17:18:18",
    });

    await item.save();

    const populatedItem = await Item.findById(item._id)
      .populate("categoryId")
      .populate("subcategoryId");

    res.status(201).json({
      success: true,
      data: populatedItem,
      message: "Item created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all items
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("categoryId")
      .populate("subcategoryId");

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search items
export const searchItems = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const items = await Item.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .populate("categoryId")
      .populate("subcategoryId");

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get items by category
export const getItemsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const items = await Item.find({ categoryId })
      .populate("categoryId")
      .populate("subcategoryId");

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get items by subcategory
export const getItemsBySubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const items = await Item.find({ subcategoryId })
      .populate("categoryId")
      .populate("subcategoryId");

    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get item by ID or name
export const getItem = async (req, res) => {
  try {
    const { identifier } = req.params;
    let item;

    // Check if identifier is ObjectId
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      item = await Item.findById(identifier);
    } else {
      item = await Item.findOne({ name: identifier });
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const populatedItem = await Item.findById(item._id)
      .populate("categoryId")
      .populate("subcategoryId");

    res.status(200).json({
      success: true,
      data: populatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      ...req.body,
      updatedBy: "TejasBhovad",
      updatedAt: "2025-01-25 17:18:18",
    };

    const item = await Item.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("categoryId")
      .populate("subcategoryId");

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: item,
      message: "Item updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
