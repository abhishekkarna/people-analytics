// src/middlewares/auth.middleware.ts

import jwt from "jsonwebtoken";
import Employee from "@db/models/employee.model";
import { Request, Response, NextFunction } from "express";
import { PermissionDataAttributes } from "@interfaces/permission.interface";
import { MiddlewareService } from "@services/middleware.service";
import { isAuthorized } from "@utils/helper_functions";
import { EmployeeService } from "@services/employee.service";
import { RESPONSE_MESSAGES } from "@utils/constants";

const middlewareService = new MiddlewareService();
const employeeService = new EmployeeService();

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      res.status(403).json(RESPONSE_MESSAGES.access_token_required);
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        employee_id: string;
      };
      const employeeInfo: any = await middlewareService.getEmployeeInfo(
        decoded.employee_id
      );

      if (!employeeInfo) {
        res.status(403).send("User not found");
        return;
      }

      req.user = employeeInfo.get({ plain: true });
      req.user.permissions =
        employeeInfo?.Employee?.jobProfile?.Role?.Permissions?.map(
          (perm: PermissionDataAttributes) => perm.name
        ) || [];
      delete req.user.Employee.jobProfile.Role.Permissions;

      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        res.status(401).send({ message: "Token expired" });
        return;
      }
      res.status(403).send({ message: "Invalid token" });
      return;
    }
  } catch (error) {
    res.status(403).send("Invalid token");
  }
}

export function hasReadEmployeePermissions(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const accessRequired = ["employee/read_record"];
  if (isAuthorized(accessRequired, req.user.permissions)) {
    next();
  } else {
    res.status(403).json(RESPONSE_MESSAGES.unauthorized_access);
  }
}

export function hasWriteEmployeePermissions(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const accessRequired = ["employee/create_record"];
    if (isAuthorized(accessRequired, req.user.permissions)) {
      next();
    } else {
      res.status(403).json(RESPONSE_MESSAGES.unauthorized_access);
    }
  } catch (error) {
    res.status(403).json(RESPONSE_MESSAGES.unauthorized_access);
  }
}

export async function hasSpecificEmployeePermissions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessRequired = ["employee/read_record"];
  const { employee_id } = req.params;
  if (
    isAuthorized(employeeService.WILDCARD_PERMISSIONS, req.user.permissions)
  ) {
    next();
  } else if (
    isAuthorized(accessRequired, req.user.permissions) &&
    (await employeeService.isOwnEmployee(
      employee_id,
      req.user.Employee.employee_id
    ))
  ) {
    next();
  } else {
    res.status(403).json(RESPONSE_MESSAGES.unauthorized_access);
  }
}
