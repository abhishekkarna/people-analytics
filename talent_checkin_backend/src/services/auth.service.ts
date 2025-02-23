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

      const accessToken = this._createJWTAccessToken(user.employee_id!);
      const refreshToken = jwt.sign(
        { id: user.employee_id },
        REFRESH_JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      user.refresh_token = refreshToken;
      user.save();
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async validateAndRenewAccessToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_JWT_SECRET) as {
        id: string;
      };
      const storedToken = await User.findOne({
        where: { employee_id: decoded.id, refresh_token: refreshToken },
      });
      if (!storedToken) throw "";

      const newAccessToken = this._createJWTAccessToken(decoded.id);

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new Error("Expired/Invalid refresh token");
    }
  }

  _createJWTAccessToken(employee_id: string) {
    const payload = {
      employee_id,
      iat: Math.floor(Date.now() / 1000), // Issued At
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expiry (1 hour)
    };
    return jwt.sign({ ...payload }, SECRET_KEY);
  }
}
