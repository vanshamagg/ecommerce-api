const product = require("../models/product");
const images = require("../models/images");
const path = require("path");
const fs = require("fs");

// adding the product info to the db (CREATE)
async function addProductToDatabase(req, res) {
    const { bullets, productTitle, category, mrp, price, description, productImage, attributes, variations } = req.body;
    // const newImage = new images({
    //     data: fs.readFileSync(productImage),
    //     contentType: "Something"
    // });
    try {
        // const doc = await newImage.save();
        // console.log("Image ID", doc._id);
        const newProduct = new product({
            productTitle,
            category,
            mrp,
            price,
            attributes,
            description,
            bullets,
            variations,
            // productImage: doc._id,
        });

        const doc = await newProduct.save();
        res.send({ message: "New Product Created Successfully", newProduct });
        console.log("New Product Created Successfully".white.bold);
    } catch (err) {
        console.log(err.message.bold.red);
        res.send({ message: err.message });
    } finally {
        // remove the image file from the local server
        // fs.rmSync(req.file.destination + "/" + req.file.filename);
    }
}

// READ -  get product details by ID
async function getProductbyID(req, res) {
    try {
        const _id = req.params.id;
        const doc = await product.find({ _id });
        res.send(doc);
    } catch (err) {
        console.log(err.message.bold.red);
        res.send(err.message);
    }
}

// UPDATE - update product details
async function updateProductDetails(req, res) {
    try {
        const _id = req.params.id;
        const { bullets, productTitle, category, mrp, price, attributes, description, productImage, variations } = req.body;
        // const attributes = attr.map((value, index) => (value ? { key: value, value: val[index] } : {}));
        const doc = await product.findOneAndUpdate(
            { _id },
            {
                bullets,
                productTitle,
                category,
                mrp,
                price,
                attributes,
                description,
                variations,
            },
            { new: true, runValidators: true, useFindAndModify: true }
        );
        res.send({ message: "Updated Successfully", doc });
        console.log("product updated".bold.white);
    } catch (err) {
        res.send({ message: err.message });
        console.log(err.message.bold.red);
    }
}

// DELETE- product
async function deleteProduct(req, res) {
    try {
        const _id = req.params.id;
        const data = await product.findOneAndDelete({ _id }, { useFindAndModify: true });
        console.log("Product Deleted from Database".bold.white);
        res.send({ message: "Product Deleted from Database" });
    } catch (err) {
        console.log(err.message.bold.red);
        res.send({ message: err.message });
    }
}

module.exports.addProductToDatabase = addProductToDatabase;
module.exports.getProductbyID = getProductbyID;
module.exports.updateProductDetails = updateProductDetails;
module.exports.deleteProduct = deleteProduct;
