const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} = require("../controllers/goalControllers");
const { ProtectAuth } = require("../middleware/authmiddleware");

//======== advance use ========
router.route("/").get(ProtectAuth, getGoals).post(ProtectAuth, setGoals);
router
  .route("/:id")
  .put(ProtectAuth, updateGoals)
  .delete(ProtectAuth, deleteGoals);

//======== old use ========

// router.get("/", getGoals);
// router.post("/", fsetGoals);
// router.put("/:id", updateGoals);
// router.delete("/:id", deleteGoals);

module.exports = router;
