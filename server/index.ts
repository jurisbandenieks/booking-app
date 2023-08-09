import keys from "./keys";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Pool } from "pg";
import redis from "redis";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 5000;

//  Postgress setup

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on("error", () => console.log("Lost PG connection"));

pgClient
  .query("CREATE TABLE IF NOT EXISTS values (number INT")
  .catch((err) => console.log(err));

//  Redis setup

const redisClient = redis.createClient({
  socket: {
    host: keys.redisHost,
    port: keys.redisPort,
    reconnectStrategy: () => 1000
  }
});

const redisPublisher = redisClient.duplicate();

// endpoints
app.get("/", (reg: Request, res: Response) => {
  res.send("API is working");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
