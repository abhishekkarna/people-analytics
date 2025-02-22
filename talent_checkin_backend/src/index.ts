import express, { Application } from "express";
import cors from "cors";
import compression from "compression";
import correlator from "express-correlation-id";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "@db/models/index";
import { init_associations } from "@db/models/associations";
init_associations();

import { errorHandler } from "@middlewares/errorHandler.middleware";
import Logger from "@utils/logger";

// Routes
import { apiRoutes } from "./routes";

const app: Application = express();
app.disable("x-powered-by");
app.set("trust proxy", true);

const logger = new Logger();
// CONSTANTS
const whitelist = ["http://localhost:4200"];
const APP_PORT = 3000;

const corsOptions = {
  origin: (
    origin: string | undefined = "",
    callback: (err: Error | null, allow: boolean) => void
  ) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
};
process.on("SIGINT", () => {
  logger.log("stopping the server", "info");
  process.exit(0);
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
app.use(errorHandler);
app.use("/api/v1", apiRoutes);

connectDB().then(() => {
  app.listen(APP_PORT, () => {
    console.log(`🚀 Server running on port ${APP_PORT}`);
  });
});

export default app;
