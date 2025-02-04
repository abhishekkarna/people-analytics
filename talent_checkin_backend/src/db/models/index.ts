import { Sequelize } from "sequelize";
import JobProfile from "@db/models/job_profile.model";
import Employee from "@db/models/employee.model";
import associations from "@db/models/associations";
import { DB_CONFIG } from "@config/database";
import { Config } from "@interfaces/dbConfig.interface";

const ENV: keyof Config =
  (process.env.NODE_ENV as keyof Config) || "development";

const dbConfig = DB_CONFIG[ENV];

if (!dbConfig) throw new Error("DB config missing");
console.log("===========", dbConfig);
const sequelize = new Sequelize(
  dbConfig?.database,
  dbConfig.username,
  dbConfig.password || "",
  {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
  }
);

sequelize.sync({ force: false }).then(() => {
  console.log("Database synced with associations!");
});
export { Sequelize, sequelize };
