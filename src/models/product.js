const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema({
    mode: { type: String, required: true, default: "color" },
    image: { type: mongoose.Schema.Types.ObjectId, required: true, default: "5fd256e77ce85916e9d69188" },
});

const productSchema = new mongoose.Schema({
    productTitle: { type: String, required: true, minlength: 50, maxlength: 150 },
    productImage: { type: mongoose.ObjectId, required: false, default: "5fd256e77ce85916e9d69188" },
    addedBy: {type: String, required:true, default: "admin"},
    category: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    attributes: { type: mongoose.Schema.Types.Mixed, required: true },
    description: { type: String, required: true },
    bullets: { type: [String], required: true },
    variations: { type: [variationSchema], required: false },
});

module.exports = mongoose.model("products", productSchema);
