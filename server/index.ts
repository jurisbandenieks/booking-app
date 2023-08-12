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

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.error(err));
});

//  Redis setup

// endpoints
app.get("/", (reg: Request, res: Response) => {
  res.send("API is working");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
