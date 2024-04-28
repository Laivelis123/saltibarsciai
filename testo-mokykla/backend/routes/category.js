const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User, Category } = require("../models");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return next({ status: 401, message: "Missing token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next({ status: 403, message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};
router.delete("/:categoryId/remove", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { categoryId } = req.params;
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Kategorija nerasta" });
    }
    if (category.userId !== userId) {
      return res.status(403).json({ error: "Negalima trinti kategorijos" });
    }
    await category.destroy();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Klaida trinant kategoriją:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});
router.get("/my", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const categories = await Category.findAll({
      where: { userId: userId },
      include: [{ model: Category, as: "parent" }],
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching user categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Gauna visus kategorijas pagal filtrą arba be filtro.
router.get("/filter", verifyToken, async (req, res) => {
  try {
    const { search } = req.query;
    let categories;

    if (search) {
      categories = await Category.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        include: [{ model: Category, as: "children", include: "children" }],
      });
    } else {
      // Gauna šakninių kategorijų sąrašą.
      categories = await Category.findAll({
        where: { parentId: null },
        include: [{ model: Category, as: "children", include: "children" }],
      });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error("Klaida gaunant kategorijas:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});

// Gauna visas kategorijas.
router.get("/all", verifyToken, async (req, res) => {
  try {
    // Gauna visas kategorijas.
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Klaida gaunant kategorijas:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});

// Gauna kategorijos vaikines kategorijas pagal nurodytą ID.
router.get("/:id/children", verifyToken, async (req, res) => {
  try {
    const categoryId = req.params.id;
    // Gauna kategorijos vaikines kategorijas.
    const childrenCategories = await Category.findAll({
      where: { parentId: categoryId },
    });
    res.status(200).json(childrenCategories);
  } catch (error) {
    console.error("Klaida gaunant vaikines kategorijas:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});

// Sukuria naują kategoriją.
router.post("/create", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { name, bulletPoints, parentId } = req.body;
    const category = await Category.create({
      name,
      bulletPoints,
      userId,
      parentId: parentId || null,
    });

    res.status(201).json({ success: true, category });
  } catch (error) {
    console.error("Klaida kuriant kategoriją:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Gauna kategoriją pagal nurodytą ID.
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });
    if (!category) {
      return res.status(404).json({ error: "Kategorija nerasta" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Klaida gaunant kategoriją:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});

router.put("/:id/update", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { name, bulletPoints, parentId } = req.body;
    console.log(parentId, id, name, bulletPoints);
    const category = await Category.findByPk(id);
    if (!category || category.userId !== userId) {
      return res
        .status(404)
        .json({ error: "Kategorija nerasta, negalite redaguoti kategorijos" });
    }
    if (category.userId !== userId) {
      return res.status(403).json({ error: "Negalima redaguoti kategorijos" });
    }
    category.name = name;
    category.bulletPoints = bulletPoints;
    category.parentId = parentId || null;
    await category.save();
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.error("Klaida redaguojant kategoriją:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});
module.exports = router;
