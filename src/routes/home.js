const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { showSignUpPage, showDashBoard } = require("../services/cookies");
const homeRouter = express.Router();
/**
 * ROUTER FOR / (home)
 */

homeRouter.use(cookieParser());
/**
 * Form for adding a new product
 */
homeRouter.use("/product/add", (req, res) => {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);
    res.sendFile(path.join(dirpath, "views", "add-product.html"));
});

/**
 * Form for updating a product
 */
homeRouter.use("/product/update", (req, res) => {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);
    res.sendFile(path.join(dirpath, "views", "update-product.html"));
});
/**
 * Form for signin
 */
homeRouter.use("/user/signin", showSignUpPage, (req, res) => {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);
    res.sendFile(path.join(dirpath, "views", "signin.html"));
});
/**
 * The user dashboard
 */
homeRouter.use("/user/dashboard", showDashBoard, (req, res) => {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);
    res.sendFile(path.join(dirpath, "views", "dashboard.html"));
});

module.exports = homeRouter;
