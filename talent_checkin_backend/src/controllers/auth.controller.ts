// src/controllers/employee.controller.ts

import { Request, Response } from "express";
import { AuthService } from "@services/auth.service";

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
      const response = await this.authService.login(email, password);
      res.status(200).json(response);
    } catch (error) {
      res.status(401).json(error);
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is missing" });
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
