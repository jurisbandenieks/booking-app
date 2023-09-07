import express from "express";
import { insertUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/user-created").post(insertUser);

export default router;
