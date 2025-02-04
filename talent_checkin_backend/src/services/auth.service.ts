import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@db/models/user.model";
import Employee from "@db/models/employee.model";
const SECRET_KEY = process.env.JWT_SECRET || "";
const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET || "";
if (!SECRET_KEY) throw new Error("JWT secret key not defined");

export class AuthService {
  async login(email: string, password: string) {
    try {
      const userAll = await User.findAll()
      console.log("-----",userAll)
      const user = await User.findOne({
        where: {
          email,
        },
        include: {
          model: Employee,
        },
      });
      if (!user?.is_login_allowed)
        throw new Error("Login not allowed for user");

      if (!user || !user.password) {
        throw new Error("Username and password are mandatory");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new Error("Invalid username or password");
      }

      const payload = {
        employee_id: user.employee_id, // employee_id
        iat: Math.floor(Date.now() / 1000), // Issued At
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expiry (1 hour)
      };
      const accessToken = jwt.sign({ ...payload }, SECRET_KEY);
      const refreshToken = jwt.sign({ sub: user.id }, REFRESH_JWT_SECRET, {
        expiresIn: "7d",
      });
      return { message: "Login successful", accessToken, refreshToken };
    } catch (error) {
      throw new Error("Error logging in " + error);
    }
  }

  async validateAndRenewAccessToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_JWT_SECRET);

      // Generate a new access token
      const newAccessToken = jwt.sign({ sub: decoded.sub }, SECRET_KEY, {
        expiresIn: "1h",
      });

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new Error("Expired/Invalid refresh token");
    }
  }
}
