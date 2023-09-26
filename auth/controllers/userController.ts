import { Response, Request } from "express";
import pgClient from "../config/db";
import { RequestWithUser } from "../types";

// @desc    Insert user
// @route   POST /auth/user/create-user
// @access  Public route
export const insertUser = async (req: Request, res: Response) => {
  const { firstName, lastName, profilePicture, phoneNumber, email } = req.body;
  const queryText = `
    INSERT INTO users (first_name, last_name, profile_picture, phone_number, email)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (email)
    DO NOTHING
    RETURNING id;
  `;
  const values = [firstName, lastName, profilePicture, phoneNumber, email];

  try {
    const result = await pgClient.query(queryText, values);
    if (result.rows.length > 0) {
      res
        .status(201)
        .send({ message: `Inserted user with ID: ${result.rows[0].id}` });
    } else {
      res.status(304).send({ message: "User already exists" });
    }
  } catch (err) {
    console.error("Error executing query", err);
  }
};

// @desc    Get user data
// @route   GET /auth/user/
// @access  Private route
export const getUser = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  const userQueryText = `SELECT u.first_name, u.last_name, u.profile_picture, u.phone_number, u.email
    FROM users u
    JOIN admins a ON u.id=a.user_id
    WHERE u.email=$1;
  `;
  const companyQueryText = `SELECT c.name, c.country, c.region, c.address, c.phone_number
    FROM users u
    JOIN owners o ON u.id= a.user_id,
    JOIN companies c ON c.id=a.company_id
    WHERE u.email=$1;
  `;
  const values = [user?.email];

  try {
    const userData = await pgClient.query(userQueryText, values);
    const companyData = await pgClient.query(companyQueryText, values);

    if (userData.rows.length > 0) {
      res
        .status(201)
        .send({ user: userData.rows[0], companies: companyData.rows });
    } else {
      res.status(404).send({ message: "User cannot be found" });
    }
  } catch (err) {
    console.error("Error executing query", err);
  }
};
