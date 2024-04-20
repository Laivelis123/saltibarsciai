const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User, Category } = require("../models");

// Gauna visus kategorijas pagal filtrą arba be filtro.
router.get("/filter", async (req, res) => {
  try {
    const { search } = req.query;
    let categories;

    if (search) {
      // Gauna kategorijas, kurių pavadinime yra nurodytas paieškos žodis.
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
router.get("/all", async (req, res) => {
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
router.get("/:id/children", async (req, res) => {
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
router.post("/create", async (req, res) => {
  try {
    const { name, bulletPoints, parentId } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log(
        "Sesija pasibaigė arba netinkamas žetonas. Vartotojas atsijungė."
      );
      return res
        .status(401)
        .json({ error: "Sesija pasibaigė arba netinkamas žetonas." });
    }

    const user = await User.findOne({ where: { username: decoded.username } });
    if (!user) {
      return res.status(404).json({ error: "Vartotojas nerastas" });
    }
    // Sukuria naują kategoriją su nurodytais duomenimis.
    const category = await Category.create({
      name,
      bulletPoints,
      userId: user.id,
      parentId: parentId || null,
    });

    res.status(201).json({ success: true, category });
  } catch (error) {
    console.error("Klaida kuriant kategoriją:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Gauna kategoriją pagal nurodytą ID.
router.get("/:id", async (req, res) => {
  try {
    // Gauna kategoriją pagal nurodytą ID kartu su vartotojo duomenimis.
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

module.exports = router;
