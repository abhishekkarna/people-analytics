import Employee from "@db/models/employee.model";
import TalentCheckin from "@db/models/talent_checkin.model";
import PerformanceData from "@db/models/performance_data.model";
import { TalentCheckinCreationAttributes } from "@interfaces/talent_checkin.interface";
import { EmployeeInstance } from "@interfaces/employee.interface";
import JobProfile from "@db/models/job_profile.model";
import User from "@db/models/user.model";
import bcrypt from "bcryptjs";
import { UserInstance } from "@interfaces/user.interface";

export class EmployeeService {
  public getAllEmployees() {
    return User.findAll({
      raw: true,
      attributes: ["id", "name", "email"],
      include: [
        {
          model: Employee,
          include: [
            {
              model: JobProfile,
              as: "jobProfile",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
  }

  public getEmployeesByManager(manager_id: number) {
    return User.findAll({
      raw: true,
      attributes: ["id", "name", "email"],
      include: [
        {
          model: Employee,
          where: {
            manager_id,
          },
          include: [
            {
              model: JobProfile,
              as: "jobProfile",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
  }
  public getEmployeeByID(id: string) {
    return Employee.findByPk(id, {
      include: [
        {
          model: JobProfile,
          as: "jobProfile",
          attributes: ["id", "name"],
        },
        {
          model: User,
          // as: "user",
          // attributes: ["name", "email"],
        },
      ],
    });
  }

  async createEmployee(
    employeeData: any
  ): Promise<[UserInstance, EmployeeInstance]> {
    const { name, email, job_profile_id, manager_id, password, _employee_id } =
      employeeData;

    const passwordHash = password ? await bcrypt.hash(password, 10) : null;
    const employee_id = _employee_id ?? Date.now();

    const userPromise = User.create({
      email,
      name,
      employee_id,
      is_login_allowed: !!passwordHash,
      password,
    });
    const employeePromise = Employee.create({
      employee_id,
      job_profile_id,
      manager_id,
    });
    return Promise.all([userPromise, employeePromise]);
  }

  public addCheckIn(check_in_data: TalentCheckinCreationAttributes) {
    return TalentCheckin.create(check_in_data);
  }
  public getHistoricalTalentCheckIns(employee_id: string) {
    return TalentCheckin.findAndCountAll({
      where: {
        employee_id,
      },
    });
  }

  public getPerformanceData(employee_id: string) {
    return PerformanceData.findAll({
      where: {
        employee_id,
      },
    });
  }
}
