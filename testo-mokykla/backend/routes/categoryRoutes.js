const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getAllCategories,
  getMyCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  filterCategories,
  getChildrenCategories,
  getCategoryById,
} = require("../controllers/categoryController");

router.get("/all", verifyToken, getAllCategories);
router.get("/my", verifyToken, getMyCategories);
router.post("/create", verifyToken, createCategory);
router.put("/:id/update", verifyToken, updateCategory);
router.delete("/:categoryId/remove", verifyToken, deleteCategory);
router.get("/filter", verifyToken, filterCategories);
router.get("/:id/children", verifyToken, getChildrenCategories);
router.get("/:id", verifyToken, getCategoryById);

module.exports = router;
