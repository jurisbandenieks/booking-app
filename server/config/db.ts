import { Pool } from "pg";
import { keys } from "../keys";

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
})
  .on("connect", () => {
    console.log("DB connection");
  })
  .on("error", () => console.log("Lost PG connection"));

export default pgClient;
