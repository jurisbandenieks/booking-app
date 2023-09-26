import express from "express";
import { getUser, insertUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware.js";

const router = express.Router();

router.route("/user").post(insertUser).get(verifyToken, getUser);

export default router;
