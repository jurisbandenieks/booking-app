import { Response, Request } from "express";
import pgClient from "../config/db";

// @desc    Insert user
// @route   POST /auth/user/create-user
// @access  Public route
export const insertUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { firstName, lastName, profilePicture, phoneNumber, email } = req.body;
  const queryText = `
    INSERT INTO users (first_name, last_name, profile_picture, phone_number, email)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (id)
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
