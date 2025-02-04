// Import the required libraries
// import "./tracer";
import express from "express";
import cors from "cors";
import compression from "compression";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "@db/models/index";
import associations from "@db/models/associations";
import Logger from "@utils/logger";
import swaggerDefinition from "@docs/apidoc";
import correlator from "express-correlation-id";
import { Application } from "express";
import { apiRoutes } from "./routes";
import { errorHandler } from "@middlewares/errorHandler.middleware";

// Assuming logger is a class and instantiated here
const logger = new Logger();
const app: Application = express(); // Define the app as an express application

app.disable("x-powered-by");
app.set("trust proxy", true);
app.set("port", process.env.DEV_APP_PORT || 3000);
import("@db/models/index").then((db) => app.set("db", db));

const whitelist = ["http://localhost:4200"];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow: boolean) => void
  ) => {
    if (whitelist.indexOf(origin || "") !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
};
const swaggerOptions = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"], // Adjust for TypeScript files
};
process.on("SIGINT", () => {
  logger.log("stopping the server", "info");
  process.exit();
});

// Handle SIGTERM
process.on("SIGTERM", () => {
  logger.log("SIGTERM Received, exiting...", "info");
  process.exit(0);
});

process.on("uncaughtException", (error: Error) => {
  logger.log("Uncaught exception", "error", error);
});

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  logger.log(
    `Unhandled Rejection at ${JSON.stringify(promise)}`,
    "error",
    promise
  );
  logger.log("Reason For Rejection", "error", reason);
});

app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(correlator());
app.use(compression());
app.use(compression());
app.use("/api/v1", apiRoutes);
app.use(errorHandler);

// const swaggerSpec = swaggerJSDoc(swaggerOptions);
// if (
//   process.env.NODE_ENV === "development" ||
//   process.env.NODE_ENV === undefined
// ) {
//   app.use(
//     "/docs",
//     swaggerUi.serve,
//     swaggerUi.setup(swaggerSpec, {
//       swaggerOptions: { persistAuthorization: true },
//     })
//   );
// }

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
