// src/routes/employee.routes.ts

import { Router } from "express";
import { employeeRoutes } from "./employees.routes";
import { authRoutes } from "./auth.routes";

export const apiRoutes = Router();

apiRoutes.use("/employees", employeeRoutes);
apiRoutes.use("/auth", authRoutes);
