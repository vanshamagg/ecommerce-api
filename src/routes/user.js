const express = require("express");
const userRouter = express.Router();
const { addUser, getUsers, getUserById, updateUserbyId, deleteUserById } = require("../controllers/user");
const user = require("../models/user");
userRouter.use(express.json());

// CREATE -  a new user
userRouter.post("/", addUser);

// READ - get all users
userRouter.get("/", getUsers);

// READ - get one user details
userRouter.get("/:id", getUserById);

// UPDATE
userRouter.patch("/update/:id", updateUserbyId);

// DELETE - a user by ID
userRouter.delete("/delete/:id", deleteUserById);

module.exports = userRouter;
