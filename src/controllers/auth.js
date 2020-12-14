/**
 * CONTROLLERS FOR THE /auth ROUTES
 */
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

/**
 * Local Authentication
 */
async function authenticateUser(req, res) {
    try {
        let doc = await user.find({ email: req.body.email });
        doc = doc[0];
        if (!doc) throw new Error("User Not Found");
        if (doc.password === req.body.password) {
            const creds = {
                _id: doc._id.toString(),
                role: doc.role.toString(),
                time: Date.now(),
            };
            const encoded = jwt.sign(creds, process.env.JWB_SECRET_KEY);
            res.cookie("token", encoded, { httpOnly: true, expires: 0 });
            res.redirect("/user/dashboard");
            console.log("User Authenticated".white.bold)
        } else {
            throw new Error("Wrong Password");
        }
    } catch (err) {
        console.log(err.message.red.bold);
        res.status(400).send({ message: err.message });
    }
}

/**
 * Authentication Using Google
 */
function authenticateGoogle(req, res) {
    // res.send("Authenticating using google..")
    const creds = {
        _id: req.user._id.toString(),
        role: req.user.role.toString(),
        time: Date.now(),
    };
    const encoded = jwt.sign(creds, process.env.JWB_SECRET_KEY);
    res.cookie("token", encoded, { httpOnly: true, expires: 0 });
    res.redirect("/user/dashboard");
    console.log("User Authenticated".white.bold)
}
 module.exports.authenticateUser = authenticateUser;
 module.exports.authenticateGoogle = authenticateGoogle;
