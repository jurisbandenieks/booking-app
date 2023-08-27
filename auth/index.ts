import express, { Request, Response } from "express";
import { auth } from "express-openid-connect";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { config } from "./config/auth";

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("tiny"));

const PORT = 5001;

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
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Auth is running" });
});

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get("/profile", (req: Request, res: Response) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
