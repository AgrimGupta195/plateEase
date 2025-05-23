const Item = require("../models/itemModel");
const User = require("../models/userModel");
const addReview = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { rating, comment } = req.body;
        if (!rating || rating < 0 || rating > 5) {
            return res.status(400).json({ message: "Valid rating (0-5) is required" });
        }
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        const existingReview = item.reviews.find(
            (review) => review.user.toString() === req.user.id
        );
        if (existingReview) {
            return res.status(400).json({ message: "You have already reviewed this item" });
        }
        const newReview = {
            user: req.user.id,
            rating,
            comment,
        };
        item.reviews.push(newReview);
        const totalRating = item.reviews.reduce((sum, review) => sum + review.rating, 0);
        item.rating = totalRating / item.reviews.length;

        await item.save();

        res.status(201).json({
            message: "Review added successfully",
            review: newReview,
        });
    } catch (error) {
        console.error("Error in addReview controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const editReview = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { rating, comment } = req.body;
        if (!rating || rating < 0 || rating > 5) {
            return res.status(400).json({ message: "Valid rating (0-5) is required" });
        }
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        const review = item.reviews.find(
            (review) => review.user.toString() === req.user.id
        );
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        review.rating = rating;
        review.comment = comment;
        const totalRating = item.reviews.reduce((sum, review) => sum + review.rating, 0);
        item.rating = totalRating / item.reviews.length;

        await item.save();

        res.status(200).json({
            message: "Review updated successfully",
            review,
        });
    } catch (error) {
        console.error("Error in editReview controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};
const deleteReview = async (req, res) => {
    try {
        const { itemId } = req.params;
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        const reviewIndex = item.reviews.findIndex(
            (review) => review.user.toString() === req.user.id
        );
        if (reviewIndex === -1) {
            return res.status(404).json({ message: "Review not found" });
        }
        item.reviews.splice(reviewIndex, 1);
        if (item.reviews.length > 0) {
            const totalRating = item.reviews.reduce((sum, review) => sum + review.rating, 0);
            item.rating = totalRating / item.reviews.length;
        } else {
            item.rating = 0;
        }

        await item.save();

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error in deleteReview controller:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { addReview, editReview, deleteReview };