import express from "express";
import { createNewUser, getAllUser, getUserById, getUserDetail, logout, userLogin } from "../controller/user.controller.js";

const router = express.Router();

// GET
router.route("/getUserDetail").get(getUserDetail);
router.route("/getAllUsers").get(getAllUser);
router.route("/getUserById/:id").get(getUserById);
router.route("/logout").get(logout);
// POST
router.route("/signup").post(createNewUser);
router.route("/signin").post(userLogin);


export default router;