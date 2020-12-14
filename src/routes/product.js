/**
 * ROUTER FOR /api/product
 */

const express = require("express");
const product = require("../models/product");
const { addProductToDatabase, getProductbyID, updateProductDetails, deleteProduct } = require("../controllers/product");
const multer = require("multer");
const { checkCookies } = require("../services/cookies");
const cookieParser = require('cookie-parser');

const productRouter = express.Router();
// multer options
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, __dirname + "/uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     },
// });
// // multer middleware
// var upload = multer({ storage: storage });

// middlewares
productRouter.use(express.json());
productRouter.use(cookieParser());
productRouter.use(checkCookies);

/**
 * Create a product
 */
productRouter.post("/", addProductToDatabase);

/**
 * Get all the products
 */
productRouter.get("/", async (req, res) => {
    const collection = await product.find();
    res.send(collection);
});

/**
 * Get a product using ID
 */
productRouter.get("/:id", getProductbyID);

/**
 * Update product using ID
 */
productRouter.patch("/:id", updateProductDetails);

/**
 * Delete a product using ID
 */
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
