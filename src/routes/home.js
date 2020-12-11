const express = require("express");
const path = require("path" );
const homeRouter = express.Router();

homeRouter.use("/product/add", (req, res) => {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);
    res.sendFile(path.join(dirpath, "views", "add-product.html"));
});

homeRouter.use("/product/update", (req,res)=> {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);
    res.sendFile(path.join(dirpath, "views", "update-product.html"));
})
module.exports = homeRouter;
