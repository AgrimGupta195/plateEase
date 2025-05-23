const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enums:["Beverages","Desserts","Chinese","Daily Specials","BestSellers","Snacks"],
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    stock: {
        type: Boolean,
        default: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            rating: {
                type: Number,
                min: 0,
                max: 5,
            },
            comment: {
                type: String,
            },
        },
    ],
    tags: {
        type: [String],
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);