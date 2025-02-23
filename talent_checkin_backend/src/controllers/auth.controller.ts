// src/controllers/employee.controller.ts

import { Request, Response } from "express";
import { AuthService } from "@services/auth.service";
import Logger from "@utils/logger";
import { successResponse, errorResponse } from "@utils/response";

const logger = new Logger();

class AuthController {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
    this.login = this.login.bind(this);
  }

  // Get all employees
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await this.authService.login(
        email,
        password
      );
      // Store refresh token in a secure HttpOnly cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res
        .status(200)
        .send(successResponse("Login successful", { accessToken }));
    } catch (error: any) {
      logger.log(error.message, "error", error);
      res.status(401).json(errorResponse("Invalid credentials", error.message));
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        res.status(401).json({ message: "Refresh token is missing" });
        return;
      }
      const response = await this.authService.validateAndRenewAccessToken(
        refreshToken
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(403).json(error);
    }
  };
}

// Export an instance of EmployeeController with a service instance
const authServiceInstance = new AuthService();
export default new AuthController(authServiceInstance);
