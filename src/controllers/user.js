const { get } = require("mongoose");
const user = require("../models/user");
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
        const { firstname, lastname, email, address, phone, role, password } = req.body;
        const doc = await user.findOneAndUpdate({ _id }, { firstname, lastname, email, address, phone, role, password }, { new: true, runValidators: true, useFindAndModify: true });
        res.send({ message: "Updated Successfully", doc });
        console.log("User Updated Successfully".white.bold);
    } catch (err) {
        res.send({ message: err.message });
        console.log(err.message.bold.red);
    }
}
module.exports.addUser = addUser;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.updateUserbyId = updateUserbyId;
module.exports.deleteUserById = deleteUserById;
