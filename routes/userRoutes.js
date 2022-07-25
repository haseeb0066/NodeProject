const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userControllers");
const { ProtectAuth } = require("../middleware/authmiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", ProtectAuth, getMe);

module.exports = router;
