const user = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
async function addUser(req, res) {
    try {
        const { firstname, lastname, email, address, phone, role, password } = req.body;
        const newUser = new user({
            firstname,
            lastname,
            email,
            address,
            phone,
            role,
            password,
        });

        const doc = await newUser.save();
        res.send({ message: "New User Successfully Added", newUser });
        console.log("New User Successfully Added".white.bold);
    } catch (err) {
        res.send({ message: err.message });
        console.log(err.message.red.bold);
    }
}

async function getUsers(req, res) {
    try {
        const collection = await user.find();
        res.send(collection);
    } catch (err) {
        res.send({ message: err.message });
        console.log(err.message.red.bold);
    }
}

async function getUserById(req, res) {
    try {
        const _id = req.params.id;
        const doc = await user.find({ _id });
        res.send(doc);
    } catch (err) {
        res.send({ message: err.message });
        console.log(err.message.red.bold);
    }
}

async function deleteUserById(req, res) {
    try {
        const _id = req.params.id;
        const doc = await user.findOneAndDelete({ _id });
        res.send({ message: "User Deleted", doc });
        console.log("User deleted".white.bold);
    } catch (err) {
        res.send({ message: err.message });
        console.log(err.message.red.bold);
    }
}

async function updateUserbyId(req, res) {
    try {
        const _id = req.params.id;
        const { firstname, lastname, email, address, phone, role, password, cart } = req.body;
        const doc = await user.findOneAndUpdate({ _id }, { firstname, lastname, email, address, phone, role, password, cart }, { new: true, runValidators: true, useFindAndModify: true });
        res.send({ message: "Updated Successfully", doc });
        console.log("User Updated Successfully".white.bold);
    } catch (err) {
        res.send({ message: err.message });
        console.log(err.message.bold.red);
    }
}


async function getCartById(req, res) {
    try {
        const  obj = jwt.verify(req.cookies.token, process.env.JWB_SECRET_KEY); 
        const _id = obj._id;
        const doc = await user.find({ _id });
        const cart = doc[0].cart;
        res.send(cart);
    } catch (err) {
        res.send({ message: err.message });
        console.log(err.message.red.bold);
    }
}

async function modifyCart(req, res) {
    try {
        const  obj = jwt.verify(req.cookies.token, process.env.JWB_SECRET_KEY); 
        const _id = obj._id;
        const cart = req.body;
        const doc = await user.findOneAndUpdate({ _id }, { cart }, { new: true, runValidators: true, useFindAndModify: false });
        res.send({ message: "Cart Updated Successfully", cart: doc.cart });
        console.log("Cart Updated Successfully".white.bold)
    } catch (err) {
        console.log(err.message.red.bold);
        res.send({ message: err.message });
    }
}
module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.updateUserbyId = updateUserbyId;
module.exports.deleteUserById = deleteUserById;
module.exports.getCartById = getCartById;
module.exports.modifyCart = modifyCart;
