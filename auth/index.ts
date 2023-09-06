import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { verifyToken } from "./middleware";
import userRoutes from "./routes/userRoutes";

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

// endpoints
app.get("/", verifyToken, (req: Request, res: Response) => {
  res.send({ message: "Auth is running" });
});

app.get("/users/new-user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
