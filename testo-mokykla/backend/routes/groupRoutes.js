const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const groupController = require("../controllers/groupController");

// Teacher Routes
router.post("/create", verifyToken, groupController.createGroup);
router.get("/my-groups", verifyToken, groupController.getUserGroups);
router.put("/:groupId", verifyToken, groupController.updateGroup);
router.delete("/:groupId", verifyToken, groupController.deleteGroup);
router.delete(
  "/:groupId/users/:userId",
  verifyToken,
  groupController.removeUserFromGroup
);

// Student Routes
router.post("/join", verifyToken, groupController.joinGroup);
router.get("/joined-groups", verifyToken, groupController.getUserJoinedGroups);
router.delete("/:groupId/leave", verifyToken, groupController.leaveGroup);

// All Routes
router.get("/:groupId", verifyToken, groupController.getGroupById);

module.exports = router;
