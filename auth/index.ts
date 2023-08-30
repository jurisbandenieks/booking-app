import express, { Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

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

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "{yourApiIdentifier}",
  issuerBaseURL: `https://dev-rxfrw6obup4z0hez.us.auth0.com/`
});

// endpoints
app.get("/", checkJwt, (req: Request, res: Response) => {
  res.send({ message: "Auth is running" });
});

// auth router attaches /login, /logout, and /callback routes to the baseURL

app.get("/profile", checkJwt, (req: Request, res: Response) => {
  res.send({ message: "Profile is valid" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
