import express from "express";
import { getCompanies } from "../controllers/companyController";
import { verifyToken } from "../middleware/checkAdmin";

const router = express.Router();

router.route("/").get(verifyToken, getCompanies);

export default router;
