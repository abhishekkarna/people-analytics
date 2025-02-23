import Employee from "@db/models/employee.model";
import JobProfile from "@db/models/job_profile.model";
import Permission from "@db/models/permission.model";
import Role from "@db/models/role.model";
import User from "@db/models/user.model";
import { UserWithRelations } from "@interfaces/user.interface";

export class UserService {
  public async getEmployeeInfo(
    employee_id: string,
    employee_exclude: string[] = [],
    job_profile_exclude: string[] = [],
    role_exclude: string[] = [],
    user_exclude: string[] = []
  ) {
    try {
      const userInfo: UserWithRelations | null = await User.findOne({
        where: { employee_id },
        include: [
          {
            model: Employee,
            attributes: {
              exclude: employee_exclude,
            },
            include: [
              {
                model: JobProfile,
                as: "jobProfile",
                attributes: {
                  exclude: job_profile_exclude,
                },
                include: [
                  {
                    model: Role,
                    attributes: {
                      exclude: role_exclude,
                    },
                    include: [
                      {
                        model: Permission,
                        attributes: {
                          include: ["name"],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        attributes: {
          exclude: user_exclude,
        },
        logging: console.log,
      });
      return userInfo;
    } catch (error) {
      throw error;
    }
  }
}
