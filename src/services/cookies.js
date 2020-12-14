/**
 * CUSTOM COOKIE PARSING MIDDLEWARES
 */

const jwt = require("jsonwebtoken");
const dotenv =  require("dotenv").config();
/**
 * Checks the presence of 'token' cookie
 */
function checkCookies(req, res, next) {
    if (req.cookies.token) {
        next();
    } else {
        res.redirect("/user/signin");
    }
}
/**
 * check if the cookie has a 'role' === 'admin'
 */
function checkAdminAccess(req, res, next) {
    if (req.cookies.token && decodeToken(req.cookies.token).role === "admin") {
        next();
    } else {
        res.send({ messge: "Sign in as the administrator" });
    }
}
/**
 * If the user is signed in,
 * the signin page wont show
 */
function showSignUpPage(req, res, next) {
    if (req.cookies.token) {
        res.redirect("/user/dashboard");
    } else {
        next();
    }
}
/**
 * If the user is not signed it,
 * the dashboard page can't be shown
 */
function showDashBoard(req, res, next) {
    if (req.cookies.token) {
        next();
    } else {
        res.redirect("/user/signin");
    }
}

/**
 * decodes the JWT token
 */
function decodeToken(token) {
    return jwt.verify(token, process.env.JWB_SECRET_KEY);
}
module.exports.checkCookies = checkCookies;
module.exports.checkAdminAccess = checkAdminAccess;
module.exports.showSignUpPage = showSignUpPage;
module.exports.showDashBoard = showDashBoard;
