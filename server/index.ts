import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import companyRoutes from "./routes/companyRoutes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("tiny"));

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
app.get("/", (req: Request, res: Response) => {
  res.send({ message: "API is running" });
});

app.use("/companies", companyRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
