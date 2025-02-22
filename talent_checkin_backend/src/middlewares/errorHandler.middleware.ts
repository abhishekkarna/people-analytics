// src/middleware/errorHandler.ts
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

// Global error handling middleware
// export const errorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.error("Unhandled error:", err); // Log the error for debugging

//   // If it's a known error, send a specific message
//   if (err.isOperational) {
//     return res.status(err.statusCode || 500).json({
//       message: err.message || "Internal Server Error",
//     });
//   }

//   // If it's an unknown error, send a generic message
//   return res.status(500).json({
//     message: "Something went wrong!",
//   });
// };

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("-----------------Unhandled error----------------------", err); // Log the error for debugging
  // If it's a known error, send a specific message
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }

  // If it's an unknown error, send a generic message
  res.status(500).json({
    message: "Something went wrong!",
  });
};
