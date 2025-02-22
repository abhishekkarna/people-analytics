// src/controllers/employee.controller.ts

import { Request, Response } from "express";
import { EmployeeService } from "@services/employee.service";
import bcrypt from "bcryptjs";

class EmployeeController {
  private employeeService: EmployeeService;
  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
    this.getAllEmployees = this.getAllEmployees.bind(this);
  }

  // Get all employees
  getAllEmployees = async (req: Request, res: Response) => {
    try {
      const user = req.user;
      let employees: any;

      if (user["Employee.jobProfile.type"] === "superadmin") {
        employees = await this.employeeService.getAllEmployees();
      } else {
        employees = await this.employeeService.getEmployeesByManager(
          user.employee_id
        );
      }
      res.status(200).json(employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  };

  // Get all employees
  addEmployee = async (req: Request, res: Response) => {
    try {
      const {
        name,
        email,
        job_profile_id,
        manager_id = null,
        password = null,
        _employee_id = null,
      } = req.body;
      const passwordHash = password ? await bcrypt.hash(password, 10) : null;
      const [user, _] = await this.employeeService.createEmployee({
        name,
        email,
        job_profile_id,
        manager_id,
        password: passwordHash,
      });
      const { employee_id, id, createdAt } = user;

      const employeeCreateResponse = {
        employee_id,
        id,
        createdAt,
        name,
        email,
        is_login_allowed: !!passwordHash,
        job_profile_id,
        manager_id,
      };
      res.status(201).json(employeeCreateResponse);
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  };

  // Get a specific employee by ID
  getEmployeeById = async (req: Request, res: Response) => {
    try {
      const employeeId = req.params.employee_id;
      const employee = await this.employeeService.getEmployeeByID(employeeId);

      if (!employee) {
        res.status(404).json({ error: "Employee not found" });
        return;
      }

      res.json(employee);
    } catch (error) {
      console.error("Error fetching employee:", error);
      throw error;
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

      res.json({ message: "Check-in added successfully" });
    } catch (error) {
      console.error("Error adding check-in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getTalentCheckIn = async (req: Request, res: Response) => {
    try {
      const employeeId = req.params.employee_id;

      const historicalTalentCheckIns =
        await this.employeeService.getHistoricalTalentCheckIns(employeeId);

      res.json({
        message: "Historical check-ins fetched successfully",
        data: historicalTalentCheckIns,
      });
    } catch (error) {
      console.error("Error adding check-in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  // Get performance data for an employee
  getPerformanceData = async (req: Request, res: Response) => {
    try {
      const employeeId = req.params.employee_id;
      const performanceData = await this.employeeService.getPerformanceData(
        employeeId
      );

      res.status(200).json(performanceData);
    } catch (error) {
      throw error;
    }
  };
}
// Export an instance of EmployeeController with a service instance
const employeeServiceInstance = new EmployeeService();
export default new EmployeeController(employeeServiceInstance);
