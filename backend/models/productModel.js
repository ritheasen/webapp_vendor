const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    comments:{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Comment',.
        type: [Object],
        userName: String,
        comment: String,
    },
    review:{
        type: Number,
        length:1
    },
    userId: {
        type: String,
    },
})

module.exports = mongoose.model("Product", productSchema);