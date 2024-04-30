import 'dotenv/config';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PORT, SSL } = process.env;

export const Constants = {
  jwtSecret: process.env.JWT_SECRET,
  PGHOST,
  PGDATABASE,
  PGUSER,
  PGPASSWORD,
  PORT,
  SSL,
};
