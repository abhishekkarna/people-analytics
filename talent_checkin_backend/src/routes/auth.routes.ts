// src/routes/employee.routes.ts

import { Router } from "express";
import authCtrl from "@controllers/auth.controller";

export const authRoutes = Router();

// Employee routes
authRoutes.post("/login", authCtrl.login);
