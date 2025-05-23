const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/authMiddleware");
const { getCartProducts, addToCart, removeAllFromCart, updateQuantity } = require("../controllers/cartController");
router.get("/", authUser, getCartProducts);
router.post("/add/:productId", authUser, addToCart);
router.delete("/remove/:productId?", authUser, removeAllFromCart);
router.put("/update/:productId", authUser, updateQuantity);

module.exports = router;