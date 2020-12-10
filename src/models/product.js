const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
    key: { type: String, required: true },
    value: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
    productTitle: { type: String, required: true, minlength: 50, maxlength: 150 },
    productImage: { type: mongoose.ObjectId, required: true },
    category: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    attributes: { type: mongoose.Schema.Types.Mixed , required: true },
    description: { type: String, required: true },
    bullets: { type: [String], required: true },
});

module.exports = mongoose.model("products", productSchema);
