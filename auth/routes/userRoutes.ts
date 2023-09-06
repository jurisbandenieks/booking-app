import express from "express";
import { insertUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware.js";

const router = express.Router();

router.route("/new-user").post(verifyToken, insertUser);

export default router;
