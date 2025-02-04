import { Model } from "sequelize";
export interface EmployeeAttributes {
  employee_id?: String;
  job_profile_id: number;
  manager_id: number;
}

export interface EmployeeInstance
  extends Model<EmployeeAttributes>,
    EmployeeAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
