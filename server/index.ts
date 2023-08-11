import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pgClient from "./config/db";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 5000;

// DB setup
pgClient;

//  Redis setup

// endpoints
app.get("/", (reg: Request, res: Response) => {
  res.send("API is working");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
