import { defineConfig, type Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default defineConfig({
    schema: "./config/schema.ts",
    out: "./drizzle",
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DRIZZLE_DATABASE_URL!,
    },
} as Config);


