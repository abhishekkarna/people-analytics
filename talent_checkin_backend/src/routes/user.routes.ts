// src/routes/auth.routes.ts

import { Router } from "express";
import userCtrl from "@controllers/user.controller";

export const userRoutes = Router();

// Authentication routes
userRoutes.post("/info", userCtrl.getUserInfo);
