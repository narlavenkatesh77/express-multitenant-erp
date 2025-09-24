import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Central DB connection (to store tenants)
export const centralDb = new Sequelize(
  process.env.CENTRAL_DB_NAME,
  process.env.CENTRAL_DB_USER,
  process.env.CENTRAL_DB_PASS,
  {
    host: process.env.CENTRAL_DB_HOST,
    port: process.env.CENTRAL_DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);
