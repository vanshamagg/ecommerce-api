const express = require("express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const { authenticateUser, authenticateGoogle } = require("../controllers/auth");
const passport = require("passport");
const passportSetup = require("../services/passport-setup");

const authRouter = express.Router();

// middlewares
const upload = multer();
authRouter.use(express.json());
authRouter.use(cookieParser());
authRouter.use(passport.initialize());

// Authenticate a USER
authRouter.post("/", upload.none(), authenticateUser);

//Logout a user
authRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.send("You have successfully logged out");
    console.log("User has logged out".white.bold);
});

// Login using google
authRouter.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

authRouter.get("/google/redirect/", passport.authenticate("google"), authenticateGoogle);
module.exports = authRouter;
