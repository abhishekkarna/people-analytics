import { UserService } from "./user.service";

export class MiddlewareService {
  public async getEmployeeInfo(employee_id: string) {
    try {
      const userService = new UserService();
      const employee_exclude = ["job_profile_id", "createdAt", "updatedAt"];
      const job_profile_exclude = ["name", "role_id", "createdAt", "updatedAt"];
      const role_exclude = ["createdAt", "updatedAt"];
      const user_exclude = [
        "name",
        "email",
        "employee_id",
        "is_login_allowed",
        "createdAt",
        "updatedAt",
      ];

      const userInfo = await userService.getEmployeeInfo(
        employee_id,
        employee_exclude,
        job_profile_exclude,
        role_exclude,
        user_exclude
      );
      return userInfo;
    } catch (error) {
      throw error;
    }
  }
}
