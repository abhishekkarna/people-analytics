// import { Config } from "@interfaces/dbConfig.interface";
const dotenv = require("dotenv");
dotenv.config();

const username = process.env.db_username || "";
const password = process.env.db_password || "";
const host = process.env.db_host || "";
const dialect = "postgres";
const database = process.env.db_database || "";

console.log("username--------", username);
module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
  },
  production: { username, password, database, host, dialect },
};
