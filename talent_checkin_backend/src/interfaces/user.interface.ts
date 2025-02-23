import { Model, Optional } from "sequelize";
import { EmployeeInstance } from "./employee.interface";
import { JobProfileInstance } from "./job_profiles.interface";
import { RoleDataInstance } from "./role.interface";
import { PermissionDataInstance } from "./permission.interface";

export interface UserAttributes {
  id?: number;
  employee_id?: string; //external employee_id (if applicable)
  email: string;
  name: string;
  is_login_allowed: boolean;
  password?: string;
  refresh_token?: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserWithRelations extends UserInstance {
  Employee?: EmployeeInstance & {
    jobProfile?: JobProfileInstance & {
      Role?: RoleDataInstance & {
        Permissions?: PermissionDataInstance[];
      };
    };
  };
}
