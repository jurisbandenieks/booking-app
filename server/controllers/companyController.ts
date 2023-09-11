import { Request, Response } from "express";
import pgClient from "../config/db";

// @desc    Fetch all companies
// @route   GET /api/companies
// @access  Private admin route
export const getCompanies = async (req: Request, res: Response) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const companies = await pgClient.query("SELECT * FROM companies LIMIT $1", [
    pageSize
  ]);
  const count = await pgClient.query("SELECT count(*) from companies");

  res.json({
    companies: companies.rows,
    page,
    pages: Math.ceil(count.rowCount / pageSize)
  });
};
