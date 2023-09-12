import express from "express";
import {
  getCompanies,
  insertCompany,
  removeCompany,
  updateCompany
} from "../controllers/companyController";
import { verifyToken } from "../middleware/checkAdmin";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, getCompanies)
  .post(verifyToken, insertCompany);
router
  .route("/:id")
  .put(verifyToken, updateCompany)
  .delete(verifyToken, removeCompany);

export default router;
