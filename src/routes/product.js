const express = require("express");
const product = require("../models/product");
const { addProductToDatabase, addProductForm, getProductbyID, updateProductDetails, updateProductForm, deleteProduct } = require("../controllers/product");
const multer = require("multer");
const productRouter = express.Router();
// multer options
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
// multer middleware
var upload = multer({ storage: storage });



// VIEWS - Add Product 
productRouter.get("/add", addProductForm);
// VIEWS - Update a Product
productRouter.get('/update', updateProductForm);

// CREATE - Add a product
productRouter.post("/add", upload.single("image"), addProductToDatabase);
//  READ - get all products
productRouter.get("/", async (req, res) => {
    const collection = await product.find();
    res.send(collection);
});
// READ - get product by ID
productRouter.get("/:id", getProductbyID);
// UPDATE - Update product by ID
productRouter.post("/update/:id", upload.none(),  updateProductDetails);
// DELETE - Delete a product using ID
productRouter.get('/delete/:id', deleteProduct);

module.exports = productRouter;
