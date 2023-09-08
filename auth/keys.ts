type Keys = {
  redisHost?: string;
  redisPort?: number;
  pgUser?: string;
  pgHost?: string;
  pgDatabase?: string;
  pgPassword?: string;
  pgPort?: number;
  nodeEnv?: string;
};

export const keys: Keys = {
  redisHost: process.env.REDIS_HOST,
  redisPort: Number(process.env.REDIS_PORT),
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD,
  pgPort: Number(process.env.PGPORT),
  nodeEnv: process.env.NODE_ENV
};
