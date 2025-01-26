import Item from "../models/Item.js";
import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";

export const searchAll = async (req, res) => {
  try {
    const { query } = req.query;

    // Validate search query
    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const searchResults = {
      items: [],
      categories: [],
      subcategories: [],
    };

    // Search in items using text index
    searchResults.items = await Item.find(
      {
        $text: {
          $search: query,
        },
      },
      {
        score: { $meta: "textScore" },
      }
    )
      .sort({
        score: { $meta: "textScore" },
      })
      .populate("categoryId")
      .populate("subcategoryId");

    // REGEX for partial matches
    searchResults.categories = await Category.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    searchResults.subcategories = await Subcategory.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).populate("categoryId");

    // plaCeholder metadata
    const metadata = {
      timestamp: "2025-01-25 17:19:49",
      query: query,
      totalResults:
        searchResults.items.length +
        searchResults.categories.length +
        searchResults.subcategories.length,
      itemsCount: searchResults.items.length,
      categoriesCount: searchResults.categories.length,
      subcategoriesCount: searchResults.subcategories.length,
    };

    res.status(200).json({
      success: true,
      metadata: metadata,
      data: searchResults,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Error performing search",
      error: error.message,
      timestamp: "2025-01-25 17:19:49",
      user: "TejasBhovad",
    });
  }
};

export const searchItems = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
        timestamp: "2025-01-25 17:19:49",
        user: "TejasBhovad",
      });
    }

    const items = await Item.find(
      {
        $text: {
          $search: query,
        },
      },
      {
        score: { $meta: "textScore" },
      }
    )
      .sort({
        score: { $meta: "textScore" },
      })
      .populate("categoryId")
      .populate("subcategoryId");

    res.status(200).json({
      success: true,
      metadata: {
        timestamp: "2025-01-25 17:19:49",
        query: query,
        totalResults: items.length,
      },
      data: items,
    });
  } catch (error) {
    console.error("Item search error:", error);
    res.status(500).json({
      success: false,
      message: "Error searching items",
      error: error.message,
      timestamp: "2025-01-25 17:19:49",
      user: "TejasBhovad",
    });
  }
};

export const searchByCategory = async (req, res) => {
  try {
    const { categoryId, query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
        timestamp: "2025-01-25 17:19:49",
        user: "TejasBhovad",
      });
    }

    const searchQuery = {
      categoryId: categoryId,
      $text: { $search: query },
    };

    const items = await Item.find(searchQuery, {
      score: { $meta: "textScore" },
    })
      .sort({ score: { $meta: "textScore" } })
      .populate("categoryId")
      .populate("subcategoryId");

    res.status(200).json({
      success: true,
      metadata: {
        timestamp: "2025-01-25 17:19:49",
        query: query,
        categoryId: categoryId,
        totalResults: items.length,
      },
      data: items,
    });
  } catch (error) {
    console.error("Category search error:", error);
    res.status(500).json({
      success: false,
      message: "Error searching in category",
      error: error.message,
      timestamp: "2025-01-25 17:19:49",
      user: "TejasBhovad",
    });
  }
};

export const searchBySubcategory = async (req, res) => {
  try {
    const { subcategoryId, query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
        timestamp: "2025-01-25 17:19:49",
        user: "TejasBhovad",
      });
    }

    const searchQuery = {
      subcategoryId: subcategoryId,
      $text: { $search: query },
    };

    const items = await Item.find(searchQuery, {
      score: { $meta: "textScore" },
    })
      .sort({ score: { $meta: "textScore" } })
      .populate("categoryId")
      .populate("subcategoryId");

    res.status(200).json({
      success: true,
      metadata: {
        timestamp: "2025-01-25 17:19:49",
        query: query,
        subcategoryId: subcategoryId,
        totalResults: items.length,
      },
      data: items,
    });
  } catch (error) {
    console.error("Subcategory search error:", error);
    res.status(500).json({
      success: false,
      message: "Error searching in subcategory",
      error: error.message,
      timestamp: "2025-01-25 17:19:49",
      user: "TejasBhovad",
    });
  }
};
