import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Pool errors can be emitted while no request is awaiting a query. Handling
// them here prevents pg from turning a transient connection failure into an
// uncaught process-level exception; individual queries still reject normally.
pool.on("error", (error) => {
  console.error("Unexpected PostgreSQL pool error:", error);
});

export const db = drizzle(pool, { schema });
