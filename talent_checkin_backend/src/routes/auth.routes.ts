// src/routes/auth.routes.ts

import { Router } from "express";
import authCtrl from "@controllers/auth.controller";

export const authRoutes = Router();

// Authentication routes
authRoutes.post("/login", authCtrl.login);
authRoutes.post("/refreshToken", authCtrl.refreshToken);
