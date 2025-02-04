// src/types/express.d.ts

import { User } from "@interfaces/user.interface"; // Adjust based on your actual User type or interface

declare module "express-serve-static-core" {
  interface Request extends import("express").Request {
    user?: User;
  }
}
