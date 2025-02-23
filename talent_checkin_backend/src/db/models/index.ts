import { Sequelize } from "sequelize";
const DB_CONFIG = require("@config/database");
import { Config } from "@interfaces/dbConfig.interface";

const ENV: keyof Config =
  (process.env.NODE_ENV as keyof Config) || "development";

const dbConfig = DB_CONFIG[ENV];

if (!dbConfig) throw new Error("DB config missing");
const sequelize = new Sequelize(
  dbConfig?.database,
  dbConfig.username,
  dbConfig.password || "",
  {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    pool: {
      max: 10, // Maximum number of connections
      min: 0, // Minimum number of connections
      acquire: 30000, // Max time (ms) to get a connection
      idle: 10000, // Time before releasing connection
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export { Sequelize, sequelize, connectDB };
