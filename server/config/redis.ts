import { createClient } from "redis";
import { keys } from "../keys";

const redisClient = createClient({
  socket: {
    host: keys.redisHost,
    port: keys.redisPort,
    reconnectStrategy: () => 1000
  }
});

const redisPublisher = redisClient.duplicate();

export default redisPublisher;
