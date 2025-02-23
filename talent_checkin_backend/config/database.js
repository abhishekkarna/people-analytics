require("dotenv").config();
const username = process.env.db_username || "";
const password = process.env.db_password || "";
const host = process.env.db_host || "";
const dialect = process.env.db_dialect;
const database = process.env.db_database || "";
module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
  },
};
