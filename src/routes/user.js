const express = require("express");

const { addUser, getUsers, getUserById, updateUserbyId, deleteUserById, getCartById, modifyCart } = require("../controllers/user");

const { checkCookies, checkAdminAccess } = require("../services/cookies");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const user = require("../models/user");

const userRouter = express.Router();
// middlewares
userRouter.use(express.json());
userRouter.use(cookieParser());



// READ - get cart details of the user
userRouter.get("/cart", checkCookies, getCartById);

// PATCH - update cart of the user
userRouter.patch("/cart", checkCookies, modifyCart);

// authentication middleware
userRouter.use(checkAdminAccess);

// THESE ROUTES NEED ADMIN ACCESS

// CREATE -  a new user
userRouter.post("/", addUser);

// READ - get all users
userRouter.get("/", getUsers);

// READ - get one user details
userRouter.get("/:id", getUserById);

// UPDATE
userRouter.patch("/:id", updateUserbyId);

// DELETE - a user by ID
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
