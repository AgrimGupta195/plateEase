const Item = require("../models/itemModel");
const mongoose = require("mongoose");
const getCartProducts = async (req, res) => {
    try {
        const user = req.user;
        if (!user.cartItems || user.cartItems.length === 0) {
            return res.status(200).json({ message: "Cart is empty", cartItems: [] });
        }

        const products = await Item.find({ _id: { $in: user.cartItems.map(item => item.id) } })
            .select("name description price category images stock rating");

        const cartItems = products.map((product) => {
            const cartItem = user.cartItems.find((item) => item.id.toString() === product._id.toString());
            return { ...product.toJSON(), quantity: cartItem.quantity };
        });

        res.status(200).json({ message: "Cart retrieved successfully", cartItems });
    } catch (error) {
        console.error("Error in getCartProducts controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const item = await Item.findById(productId);
        if (!item) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (!item.stock) {
            return res.status(400).json({ message: "Product is out of stock" });
        }
        const existingItem = user.cartItems.find((item) => item.id.toString() === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push({ id: productId, quantity: 1 });
        }

        await user.save();
        const products = await Item.find({ _id: { $in: user.cartItems.map(item => item.id) } })
            .select("name description price category images stock rating");
        const cartItems = products.map((product) => {
            const cartItem = user.cartItems.find((item) => item.id.toString() === product._id.toString());
            return { ...product.toJSON(), quantity: cartItem.quantity };
        });

        res.status(200).json({ message: "Added to cart", cartItems });
    } catch (error) {
        console.error("Error in addToCart controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if (productId) {
            if (!mongoose.isValidObjectId(productId)) {
                return res.status(400).json({ message: "Invalid product ID" });
            }
            user.cartItems = user.cartItems.filter((item) => item.id.toString() !== productId);
        } else {
            user.cartItems = [];
        }

        await user.save();
        const products = await Item.find({ _id: { $in: user.cartItems.map(item => item.id) } })
            .select("name description price category images stock rating");
        const cartItems = products.map((product) => {
            const cartItem = user.cartItems.find((item) => item.id.toString() === product._id.toString());
            return { ...product.toJSON(), quantity: cartItem.quantity };
        });

        res.status(200).json({ message: "Cart updated successfully", cartItems });
    } catch (error) {
        console.error("Error in removeAllFromCart controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
const updateQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        if (!Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({ message: "Quantity must be a non-negative integer" });
        }
        const item = await Item.findById(productId);
        if (!item) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (!item.stock && quantity > 0) {
            return res.status(400).json({ message: "Product is out of stock" });
        }
        const existingItem = user.cartItems.find((item) => item.id.toString() === productId);
        if (!existingItem) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        if (quantity === 0) {
            user.cartItems = user.cartItems.filter((item) => item.id.toString() !== productId);
        } else {
            existingItem.quantity = quantity;
        }

        await user.save();
        const products = await Item.find({ _id: { $in: user.cartItems.map(item => item.id) } })
            .select("name description price category images stock rating");
        const cartItems = products.map((product) => {
            const cartItem = user.cartItems.find((item) => item.id.toString() === product._id.toString());
            return { ...product.toJSON(), quantity: cartItem.quantity };
        });

        res.status(200).json({ message: "Cart updated successfully", cartItems });
    } catch (error) {
        console.error("Error in updateQuantity controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    getCartProducts,
    addToCart,
    removeAllFromCart,
    updateQuantity,
};