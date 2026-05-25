import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || (process.env.PGHOST && `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`);

let pool;

if (connectionString) {
  pool = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false
  });
} else {
  // Provide a safe stub so importing modules don't crash the server at startup.
  // Runtime calls will receive a clear error message.
  pool = {
    query: async () => {
      throw new Error("Database connection string is not defined. Set DATABASE_URL or PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE before running queries.");
    }
  };
}

export { pool };
