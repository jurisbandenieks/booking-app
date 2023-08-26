import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 5000;

// DB setup
import pgClient from "./config/db";

const connectToDB = async () => {
  try {
    await pgClient.connect();
  } catch (err) {
    console.log(err);
  }
};
connectToDB();

//  Redis setup

// endpoints
app.get("/", (reg: Request, res: Response) => {
  res.send({ message: "API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
