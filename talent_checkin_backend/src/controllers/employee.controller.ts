// src/controllers/employee.controller.ts

import { Request, Response } from "express";
import { EmployeeService } from "@services/employee.service";
import { isAuthorized } from "@utils/helper_functions";
import { errorResponse, successResponse } from "@utils/response";

import Logger from "@utils/logger";
const logger = new Logger();

class EmployeeController {
  private employeeService: EmployeeService;
  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }

  // Get all employees
  getAllEmployees = async (req: Request, res: Response) => {
    try {
      const user = req.user;
      let employees: any;

      if (
        isAuthorized(
          this.employeeService.WILDCARD_PERMISSIONS,
          user.permissions
        )
      ) {
        employees = await this.employeeService.getAllEmployees();
      } else {
        employees = await this.employeeService.getEmployeesByManager(
          user.Employee.employee_id
        );
      }
      res
        .status(200)
        .json(successResponse("Employees list fetched", employees));
    } catch (error) {
      logger.log(`Error fetching employees: ${error}`, "error");
      res.status(500).json(errorResponse("Failed to get employees", error));
    }
  };

  // Get all employees
  addEmployee = async (req: Request, res: Response) => {
    try {
      let {
        name,
        email,
        job_profile_id,
        manager_id = null,
        is_login_allowed = false,
      } = req.body;

      if (
        !isAuthorized(
          this.employeeService.WILDCARD_PERMISSIONS,
          req.user.permissions
        )
      ) {
        // Assign the current user as the manager of the new user if not super-admin
        manager_id = req.user.Employee.employee_id;
      }

      const [user, _] = await this.employeeService.createEmployee({
        name,
        email,
        job_profile_id,
        manager_id,
        is_login_allowed,
      });
      const { employee_id, id, createdAt } = user;

      const employeeCreateResponse = {
        employee_id,
        id,
        createdAt,
        name,
        email,
        is_login_allowed,
        job_profile_id,
        manager_id,
      };
      res
        .status(201)
        .json(
          successResponse("Employee added successfully", employeeCreateResponse)
        );
    } catch (error) {
      logger.log(`Error fetching employees: ${error}`, "error");
      res.status(500).json(errorResponse("Failed to add employee", error));
    }
  };

  // Get a specific employee by ID
  getEmployeeById = async (req: Request, res: Response) => {
    try {
      const employeeId = req.params.employee_id;
      const employee = await this.employeeService.getEmployeeByID(employeeId);

      if (!employee) {
        res.status(404).json(errorResponse("Employee not found", {}));
        return;
      }

      res
        .status(200)
        .json(
          successResponse("Employee detail fetched successfully", employee)
        );
    } catch (error) {
      logger.log(`Error fetching employee: ${error}`, "error");
      res
        .status(500)
        .json(errorResponse("Error while fetching employee details", error));
    }
  };

  // Add a check-in for an employee
  addCheckIn = async (req: Request, res: Response) => {
    try {
      const {
        employee_id,
        cycle,
        high_impact_talent,
        needs_improvement_talent,
        strengths,
        opportunity_areas,
        flight_risk,
        career_aspirations,
        planned_actions,
        session_notes,
        action_plan_highlights,
        quarterly_progress_update,
      } = req.body;

      await this.employeeService.addCheckIn({
        employee_id,
        cycle,
        high_impact_talent,
        needs_improvement_talent,
        strengths,
        opportunity_areas,
        flight_risk,
        career_aspirations,
        planned_actions,
        session_notes,
        action_plan_highlights,
        quarterly_progress_update,
      });

      res.status(201).json(successResponse("Check-in added successfully"));
    } catch (error) {
      logger.log(`Error while adding new talent checkin: ${error}`, "error");
      res
        .status(500)
        .json(errorResponse("Failed to add talent checkin data", error));
    }
  };

  getTalentCheckIn = async (req: Request, res: Response) => {
    try {
      const employeeId = req.params.employee_id;

      const historicalTalentCheckIns =
        await this.employeeService.getHistoricalTalentCheckIns(employeeId);

      res
        .status(200)
        .json(
          successResponse(
            "Historical check-ins fetched successfully",
            historicalTalentCheckIns
          )
        );
    } catch (error) {
      logger.log(
        `Error getting historical talent checkin data: ${error}`,
        "error"
      );
      res
        .status(500)
        .json(
          errorResponse("Error while fetching historical talent checkin", error)
        );
    }
  };

  // Get performance data for an employee
  getPerformanceData = async (req: Request, res: Response) => {
    try {
      const employeeId = req.params.employee_id;
      const performanceData = await this.employeeService.getPerformanceData(
        employeeId
      );

      res
        .status(200)
        .json(
          successResponse("Employee performance data fetched", performanceData)
        );
    } catch (error) {
      logger.log(`Error getting performance data: ${error}`, "error");
      res
        .status(500)
        .json(errorResponse("Error while fetching performance data", error));
    }
  };

  // Get job profiles
  getJobProfiles = async (req: Request, res: Response) => {
    try {
      const jobProfiles = await this.employeeService.getAllJobProfiles();

      res
        .status(200)
        .json(successResponse("Job profiles data fetched", jobProfiles));
    } catch (error) {
      logger.log(`Error getting job profiles data: ${error}`, "error");
      res
        .status(500)
        .json(errorResponse("Error while fetching job profiles data", error));
    }
  };
}

const employeeServiceInstance = new EmployeeService();
export default new EmployeeController(employeeServiceInstance);
