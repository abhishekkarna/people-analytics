// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { EmployeeInstance } from "@interfaces/employee.interface";
import employeeController from "@controllers/employee.controller";
import Employee from "@db/models/employee.model";
import User from "@db/models/user.model";
import JobProfile from "@db/models/job_profile.model";
import fs from "fs";

const permissions = fs.readFileSync("config/permissions.json", "utf-8");
const permissionJson = JSON.parse(permissions);
console.log("permissions", permissionJson);

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers["authorization"];
  const JWT_SECRET = process.env.JWT_SECRET || "";
  if (!token) {
    res.status(403).send("Access denied");
    return;
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(403).send("Access denied");
      return;
    }
    // Call db to get user info
    const { employee_id } = decoded as EmployeeInstance;

    const employeeInfo = await User.findOne({
      where: {
        employee_id: String(employee_id),
      },
      include: [
        {
          model: Employee,
          include: [
            {
              model: JobProfile,
              as: "jobProfile",
            },
          ],
        },
      ],
      raw: true,
    });
    // Cast decoded to your User type
    req.user = employeeInfo;
    next();
  });
}

function isAuthorized(accessRequired: string[], currentRoleName: string) {
  const currentPermissions = permissionJson.roles.find(
    (role: any) => role.name === currentRoleName
  );
  if (!currentPermissions) return false;
  const isAuthorized = accessRequired.every((access) =>
    currentPermissions.permissions.includes(access)
  );
  return isAuthorized;
}
export function hasReadEmployeePermissions(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const accessRequired = ["employee/read_record"];
  const roleName: string = req.user?.Employee?.jobProfile?.type || "";
  if (isAuthorized(accessRequired, roleName)) {
    next();
  } else {
    res.status(403).json("Unauthorized access");
  }
}

export function hasWriteEmployeePermissions(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const accessRequired = ["employee/create_record"];
  const roleName: string = req.user["Employee.jobProfile.type"];
  if (isAuthorized(accessRequired, roleName)) {
    next();
  } else {
    res.status(403).json("Unauthorized access");
  }
}

export async function hasSpecificEmployeePermissions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const is_own_employee = async () => {
    const employee_id = req.params.employee_id;
    const isEmployeeManager = await Employee.findOne({
      where: {
        employee_id,
        manager_id: req.user.employee_id,
      },
      attributes: ["employee_id"],
    });
    return isEmployeeManager;
  };
  const roleName: string = req.user["Employee.jobProfile.type"];
  if (roleName === "superadmin") {
    next();
  } else if (roleName == "admin") {
    const isOwnManager = await is_own_employee();
    if (isOwnManager) {
      next();
    } else {
      res.status(403).json("Unauthorized access");
    }
  } else {
    res.status(403).json("Unauthorized access");
  }
}
