// src/routes/employee.routes.ts

import { Router } from "express";
import employeeCtrl from "@controllers/employee.controller";
import {
  hasReadEmployeePermissions,
  hasSpecificEmployeePermissions,
  hasWriteEmployeePermissions,
} from "@middlewares/auth.middleware";

export const employeeRoutes = Router();

// Employee routes
employeeRoutes.get(
  "/",
  hasReadEmployeePermissions,
  employeeCtrl.getAllEmployees
);
employeeRoutes.post(
  "/add",
  hasWriteEmployeePermissions,
  employeeCtrl.addEmployee
);

employeeRoutes.get(
  "/talent-check-in/:employee_id",
  hasSpecificEmployeePermissions,
  employeeCtrl.getTalentCheckIn
);
employeeRoutes.post(
  "/talent-check-in/:employee_id",
  hasSpecificEmployeePermissions,
  employeeCtrl.addCheckIn
);
employeeRoutes.get(
  "/performance/:employee_id",
  hasSpecificEmployeePermissions,
  employeeCtrl.getPerformanceData
);
employeeRoutes.get("/job-profiles", employeeCtrl.getJobProfiles);
employeeRoutes.get("/org-chart", employeeCtrl.getHierarchy);
employeeRoutes.get(
  "/:employee_id",
  hasSpecificEmployeePermissions,
  employeeCtrl.getEmployeeById
);
