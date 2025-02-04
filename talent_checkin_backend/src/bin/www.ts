#!/usr/bin/env node

/**
 * Module dependencies.
 */
import http, { IncomingMessage, ServerResponse } from "http";
import cluster, { Worker } from "cluster";
import os from "os";
import app from "../index";
import Logger from "../utils/logger";

const cCPUs: number = os.cpus().length;
const logger: Logger = new Logger();

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string): number | string | false {
  const portValue = parseInt(val, 10);

  if (Number.isNaN(portValue)) {
    // named pipe
    return val;
  }

  if (portValue >= 0) {
    // port number
    return portValue;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */
const port: number | string | false = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      logger.log(`${bind} requires elevated privileges`, "info");
      process.exit(1);
    case "EADDRINUSE":
      logger.log(`${bind} is already in use`, "info");
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  logger.log(`The server started listening on ${bind}`, "console");
}

/**
 * Listen on provided port, on all network interfaces.
 */
if (cluster.isMaster) {
  // Create a worker for each CPU
  for (let i = 0; i < cCPUs; i++) {
    cluster.fork();
  }

  // ElasticsearchRuleController.dailyCront(); // Uncomment if needed
  cluster.on("online", (worker: Worker) => {
    logger.log(`Worker ${worker.process.pid} is online.`, "console");
  });

  cluster.on("exit", (worker: Worker) => {
    logger.log(`Worker ${worker.process.pid} died.`, "console");
    cluster.fork();
    logger.log("Spawning new worker", "console");
  });
} else {
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
}

export default server;
