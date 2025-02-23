// src/routes/employee.routes.ts

import { Router } from "express";
import { employeeRoutes } from "./employees.routes";
import { authRoutes } from "./auth.routes";
import { authenticate } from "@middlewares/auth.middleware";
import { userRoutes } from "./user.routes";

export const apiRoutes = Router();

apiRoutes.use("/auth", authRoutes);
apiRoutes.use("/employees", authenticate, employeeRoutes);
apiRoutes.use("/user", authenticate, userRoutes);
