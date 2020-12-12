const jwt = require("jsonwebtoken");
const dotenv =  require("dotenv").config();

function checkCookies(req, res, next) {
    if (req.cookies.token) {
        next();
    } else {
        res.redirect("/user/signin");
    }
}

function checkAdminAccess(req, res, next) {
    if (req.cookies.token && decodeToken(req.cookies.token).role === "admin") {
        next();
    } else {
        res.send({ messge: "Sign in as the administrator" });
    }
}

function showSignUpPage(req, res, next) {
    if (req.cookies.token) {
        res.redirect("/user/dashboard");
    } else {
        next();
    }
}

function showDashBoard(req, res, next) {
    if (req.cookies.token) {
        next();
    } else {
        res.redirect("/user/signin");
    }
}

function decodeToken(token) {
    return jwt.verify(token, process.env.JWB_SECRET_KEY);
}
module.exports.checkCookies = checkCookies;
module.exports.checkAdminAccess = checkAdminAccess;
module.exports.showSignUpPage = showSignUpPage;
module.exports.showDashBoard = showDashBoard;
