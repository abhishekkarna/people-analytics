// src/routes/employee.routes.ts

import { Router } from "express";
import { employeeRoutes } from "./employees.routes";
import { authRoutes } from "./auth.routes";
import { authenticate } from "@middlewares/auth.middleware";

export const apiRoutes = Router();

apiRoutes.use("/employees", authenticate, employeeRoutes);
apiRoutes.use("/auth", authRoutes);
