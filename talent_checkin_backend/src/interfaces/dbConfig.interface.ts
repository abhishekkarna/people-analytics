// src/interfaces/databaseConfig.interface.ts

interface DatabaseConfig {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql"; // Restrict to known dialects
}

export interface Config {
  development?: DatabaseConfig;
  staging?: DatabaseConfig;
  production: DatabaseConfig;
}
