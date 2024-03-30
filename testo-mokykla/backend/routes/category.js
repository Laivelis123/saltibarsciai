const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User, Category } = require("../models");

// Route to fetch categories with optional search functionality
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    let categories;

    if (search) {
      // If search term is provided, filter categories by name
      categories = await Category.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`, // Case-insensitive search
          },
        },
        include: [{ model: Category, as: "children", include: "children" }], // Include child categories recursively
      });
    } else {
      // If no search term provided, fetch categories with parentId as null
      categories = await Category.findAll({
        where: { parentId: null }, // Filter by parentId being null
        include: [{ model: Category, as: "children", include: "children" }],
      }); // Include child categories recursively
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch children categories of a specific category
router.get("/:id/children", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const childrenCategories = await Category.findAll({
      where: { parentId: categoryId },
    });
    res.status(200).json(childrenCategories);
  } catch (error) {
    console.error("Error fetching children categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to create a new category
router.post("/create", async (req, res) => {
  try {
    const { name, bulletPoints, parentId } = req.body; // Add parentId to the request body

    const token = req.headers.authorization.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log("Session expired or invalid token. User disconnected.");
      return res
        .status(401)
        .json({ error: "Session expired or invalid token." });
    }

    const user = await User.findOne({ where: { username: decoded.username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("Creating category:", name, bulletPoints, user.id, parentId);
    const category = await Category.create({
      name,
      bulletPoints,
      userId: user.id,
      parentId: parentId || null, // Set parentId to null if not provided
    });

    res.status(201).json({ success: true, category });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Route to fetch details of a specific category by ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
