import { Response, Request } from "express";
import pgClient from "../config/db";

// @desc    Insert user
// @route   POST /auth/user/
// @access  Public route
export const insertUser = async (req: Request, res: Response) => {
  const { user } = req.body;
  const queryText = `
    INSERT INTO users (id, firstName, lastName, profilePicture, phoneNumber, email, password, createdAt)
    VALUES ($1, $2, $3, $4, $5, $6, $7, current_timestamp)
    ON CONFLICT (id)
    DO NOTHING
    RETURNING id;
  `;
  const values = [
    user.id,
    user.firstName,
    user.lastName,
    user.profilePicture,
    user.phoneNumber,
    user.email,
    user.password
  ];

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
