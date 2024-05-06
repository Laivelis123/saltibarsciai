const { Op } = require("sequelize");
const { User, Category } = require("../models");

// Gauna visas kategorijas.
const getAllCategories = async (req, res) => {
  try {
    // Gauna visas kategorijas.
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Klaida gaunant kategorijas:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
};

const deleteCategory = async (req, res) => {
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
};
const getMyCategories = async (req, res) => {
  try {
    const userId = req.userId;
    const categories = await Category.findAll({
      where: { userId: userId },
      include: [{ model: Category, as: "parent" }],
    });
    categories.map((category) => {
      category.bulletPoints.length > 2
        ? (category.bulletPoints = JSON.parse(category.bulletPoints))
        : (category.bulletPoints = []);
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Klaida gaunant vartotojo kategorija:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
};

// Sukuria naują kategoriją.
const createCategory = async (req, res) => {
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
};

const updateCategory = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { name, bulletPoints, parentId } = req.body;
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
};
const filterCategories = async (req, res) => {
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
};

// Gauna kategorijos vaikines kategorijas pagal nurodytą ID.
const getChildrenCategories = async (req, res) => {
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
};

// Gauna kategoriją pagal nurodytą ID.
const getCategoryById = async (req, res) => {
  try {
    const userId = req.userId;
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });
    if (!category) {
      return res.status(404).json({ error: "Kategorija nerasta" });
    }
    if (category.bulletPoints.length > 2) {
      category.bulletPoints = JSON.parse(category.bulletPoints);
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Klaida gaunant kategoriją:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
};

module.exports = {
  getAllCategories,
  getMyCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  filterCategories,
  getChildrenCategories,
  getCategoryById,
};
