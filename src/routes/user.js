const express = require("express");
const userRouter = express.Router();
const { addUser, getUsers, getUserById, updateUserbyId, deleteUserById, authenticateUser, getCartById, modifyCart } = require("../controllers/user");

const { checkAdminAccess } = require("../services/cookies");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const user = require("../models/user");

// middlewares
const upload = multer();
userRouter.use(express.json());
userRouter.use(cookieParser());

userRouter.post("/authenticate", upload.none(), authenticateUser);

// authentication middleware
userRouter.use(checkAdminAccess);

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

// READ - get cart details of the user
userRouter.get('/cart/:id', getCartById);

// PATCH - update cart of the user 
userRouter.patch('/cart/:id', modifyCart);

module.exports = userRouter;
