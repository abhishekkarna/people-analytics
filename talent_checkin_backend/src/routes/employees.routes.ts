// src/routes/employee.routes.ts

import { Router } from "express";
import employeeCtrl from "@controllers/employee.controller";
import {
  authenticate,
  hasReadEmployeePermissions,
  hasSpecificEmployeePermissions,
  hasWriteEmployeePermissions,
} from "@middlewares/auth.middleware";

export const employeeRoutes = Router();

// Employee routes
employeeRoutes.get(
  "/",
  authenticate,
  hasReadEmployeePermissions,
  employeeCtrl.getAllEmployees
);
employeeRoutes.post(
  "/add",
  authenticate,
  hasWriteEmployeePermissions,
  employeeCtrl.addEmployee
);
employeeRoutes.get(
  "/:employee_id",
  authenticate,
  hasSpecificEmployeePermissions,
  employeeCtrl.getEmployeeById
);
employeeRoutes.get(
  "/talent-check-in/:employee_id",
  authenticate,
  hasSpecificEmployeePermissions,
  employeeCtrl.getTalentCheckIn
);
employeeRoutes.post(
  "/talent-check-in/:employee_id",
  authenticate,
  hasSpecificEmployeePermissions,
  employeeCtrl.addCheckIn
);
employeeRoutes.get(
  "/performance/:employee_id",
  authenticate,
  hasSpecificEmployeePermissions,
  employeeCtrl.getPerformanceData
);
