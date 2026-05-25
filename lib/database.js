import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || process.env.PGHOST && `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

if (!connectionString) {
  throw new Error("Database connection string is not defined. Set DATABASE_URL in .env or PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE.");
}

export const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false
});
