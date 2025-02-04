import { Model, Optional } from "sequelize";

export interface UserAttributes {
  id?: number;
  employee_id?: number; //external employee_id (if applicable)
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
