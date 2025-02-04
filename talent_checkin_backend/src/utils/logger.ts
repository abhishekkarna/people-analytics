import correlator from "express-correlation-id";
import { Request } from "express";
// import chalk from "chalk";
import { LogData } from "@interfaces/log.interface";
// Type for the log levels
type LogLevel = "info" | "error" | "warn" | "access" | "cloudwatch" | "console";

class Logger {
  private allLogger: (level: LogLevel, message: string, data?: LogData) => void;

  constructor() {
    // All log level console logger (for local environments or during debugging)
    this.allLogger = async (
      level: LogLevel,
      message: string,
      data?: LogData
    ) => {
      switch (level) {
        case "error":
          // console.log(chalk.red(`[${level}]`, message), data);
          console.log(`[${level}]`, message, data);
          break;
        case "info":
          console.log(`[${level}]`, `${message} \n`, data);
          break;
        case "warn":
          console.log(`[${level}]`, message, data);
          break;
        case "console":
          console.log(`[${level}]`, message, data || "");
          break;
        default:
          console.log(`[${level}]`, message, data || "");
      }
    };
  }

  log(
    message: string,
    severity: LogLevel,
    data: LogData = {},
    req?: Request
  ): void {
    const xCorrelationId =
      req?.headers["x-correlation-id"] || correlator.getId();
    if (xCorrelationId) {
      message = ` ${xCorrelationId} ${message}`;
    }

    this.allLogger(severity || "info", message, data);
  }
}

export default Logger;
