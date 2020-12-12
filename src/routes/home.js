const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkCookies, showSignUpPage, showDashBoard } = require("../services/cookies");
const homeRouter = express.Router();

homeRouter.use(cookieParser());

homeRouter.use("/product/add", (req, res) => {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);
    res.sendFile(path.join(dirpath, "views", "add-product.html"));
});

homeRouter.use("/product/update", (req, res) => {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);
    res.sendFile(path.join(dirpath, "views", "update-product.html"));
});

homeRouter.use("/user/signin",  showSignUpPage , (req, res) => {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);
    res.sendFile(path.join(dirpath, "views", "signin.html"));
});

homeRouter.use('/user/dashboard', showDashBoard,(req, res)=> {
    let dirpath = path.dirname(__filename).split(path.sep);
    dirpath.pop();
    dirpath = dirpath.join(path.sep);
    res.sendFile(path.join(dirpath, "views", "dashboard.html"));
})

homeRouter.use('/user/logout', (req, res)=> {
    res.clearCookie('_id');
    res.send("You have successfully logged out");
})

module.exports = homeRouter;
