const product = require("../models/product");
const images = require("../models/images");
const path = require("path");
const fs = require("fs");

// product add form
function addProductForm(req, res) {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);

    res.sendFile(path.join(dirpath, "views", "add-product.html"));
}

// adding the product info to the db (CREATE)
async function addProductToDatabase(req, res) {
    const { productTitle, category, mrp, price, description, bullets } = req.body;
    const { attr, val } = req.body;
    const attributes = attr.map((value, index) => (value ? { key: value, value: val[index] } : {}));
    const newImage = new images({
        data: fs.readFileSync(req.file.destination + "/" + req.file.filename),
        contentType: req.file.mimetype,
    });
    try {
        const doc = await newImage.save();
        console.log("Image ID", doc._id);
        const newProduct = new product({
            productTitle,
            category,
            mrp,
            price,
            attributes,
            description,
            bullets,
            productImage: doc._id,
        });
        newProduct
            .save()
            .then((doc) => res.send("Uploaded Successfully"))
            .catch((err) => console.log(err.message.bold.red));
    } catch (err) {
        console.log(err.message.bold.red);
        res.send({ message: err.message });
    } finally {
        // remove the image file from the local server
        fs.rmSync(req.file.destination + "/" + req.file.filename);
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
        const { bullets, productTitle, category, mrp, price, attr, val, description, productImage } = req.body;
        const attributes = attr.map((value, index) => (value ? { key: value, value: val[index] } : {}));
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
            },
            { new: true, runValidators: true, useFindAndModify: true }
        );
        res.send({ message: "Updated Successfully", doc: doc });
        console.log("product updated".bold.green);
    } catch (err) {
        res.send({ message: err.message });
        console.log(err.message.bold.red);
    }
}
function updateProductForm(req, res) {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);

    res.sendFile(path.join(dirpath, "views", "update-product.html"));
}

// DELETE- product
async function deleteProduct(req, res) {
    try {
        const _id = req.params.id;
        const data = await product.findOneAndDelete({ _id });
        console.log("Product Deleted from Database".bold.white);
        res.send({message: "Product Deleted from Database"});
    } catch (err) {
        console.log(err.message.bold.red);
        res.send({ message: err.message });
    }
}
module.exports.addProductToDatabase = addProductToDatabase;
module.exports.addProductForm = addProductForm;
module.exports.getProductbyID = getProductbyID;
module.exports.updateProductDetails = updateProductDetails;
module.exports.updateProductForm = updateProductForm;
module.exports.deleteProduct = deleteProduct;