const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/authMiddleware");
const { addReview, editReview, deleteReview } = require("../controllers/reviewController");
router.post("/:itemId", authUser, addReview);
router.put("/:itemId", authUser, editReview);
router.delete("/:itemId", authUser, deleteReview);

module.exports = router;