import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import pgClient from "../config/db";

// @desc    Fetch all companies
// @route   GET /api/companies
// @access  Private admin route
export const getCompanies = asyncHandler(
  async (req: Request, res: Response) => {
    const pageSize = Number(req.query?.pageSize ?? 5);
    const page = Number(req.query?.page ?? 0);

    const companies = await pgClient.query(
      "SELECT * FROM companies LIMIT $1 OFFSET $2",
      [pageSize, pageSize * page]
    );
    const count = await pgClient.query("SELECT count(*) from companies");

    res.json({
      companies: companies.rows,
      page,
      total: Number(count.rows[0].count)
    });
  }
);

// @desc    Insert company
// @route   POST /api/companies
// @access  Private admin route
export const insertCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const { body: company } = req;

    try {
      const companies = await pgClient.query(
        `INSERT INTO companies (name, country, region, address, phone_number)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
        [
          company.name,
          company.country,
          company.region,
          company.address,
          company.phoneNumber
        ]
      );

      res.json({
        companies: companies.rows
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// @desc    Update company
// @route   PUT /api/companies/:id
// @access  Private admin route
export const updateCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const { company } = req.body;
    const { id } = req.params;

    const companies = await pgClient.query(
      `UPDATE companies SET name=$2, country=$3, region=$4, address=$5, phone_number=$6
    WHERE id=$1
    RETURNING *
    `,
      [
        id,
        company.name,
        company.country,
        company.region,
        company.address,
        company.phoneNumber
      ]
    );

    res.json({
      companies: companies.rows
    });
  }
);

// @desc    DELETE company
// @route   DELETE /api/companies/:id
// @access  Private admin route
export const removeCompany = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const companies = await pgClient.query(
      `DELETE FROM companies
      WHERE id=$1
      RETURNING *
      `,
      [id]
    );

    res.json({
      companies: companies.rows
    });
  }
);
