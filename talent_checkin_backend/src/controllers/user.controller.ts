// src/controllers/employee.controller.ts

import { Request, Response } from "express";
import { UserService } from "@services/user.service";
import { errorResponse, successResponse } from "@utils/response";

import Logger from "@utils/logger";
import { userInfoResponseMapper } from "src/response_mappers/user.responsemapper";
const logger = new Logger();

class UserController {
  private userService: UserService;
  constructor(employeeService: UserService) {
    this.userService = employeeService;
  }

  // Get all employees
  getUserInfo = async (req: Request, res: Response) => {
    try {
      const { employee_id } = req.user.Employee;
      const common_exclude = ["createdAt", "updatedAt"];

      const employee_exclude = ["job_profile_id"].concat(...common_exclude);
      const job_profile_exclude = ["id", "password", "refresh_token"].concat(
        ...common_exclude
      );
      const role_exclude = ["id", "password", "refresh_token"].concat(
        ...common_exclude
      );

      const user_exclude = [
        "employee_id",
        "is_login_allowed",
        "id",
        "password",
        "refresh_token",
      ].concat(...common_exclude);

      const userInfo = await this.userService.getEmployeeInfo(
        employee_id,
        employee_exclude,
        job_profile_exclude,
        role_exclude,
        user_exclude
      );
      res
        .status(200)
        .json(
          successResponse(
            "User info fetched",
            userInfo && userInfoResponseMapper(userInfo)
          )
        );
    } catch (error) {
      logger.log(`Error fetching user info: ${error}`, "error");
      res.status(500).json(errorResponse("Failed to get user info", error));
    }
  };
}

const userServiceInstance = new UserService();
export default new UserController(userServiceInstance);
