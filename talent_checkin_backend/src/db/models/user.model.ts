import { sequelize } from ".";
import { DataTypes } from "sequelize";
import { UserInstance } from "@interfaces/user.interface";

const User = sequelize.define<UserInstance>(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
      unique: true,
    },
    employee_id: {
      allowNull: false,
      autoIncrement: false,
      type: DataTypes.TEXT,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    email: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    is_login_allowed: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    refresh_token: {
      defaultValue: null,
      allowNull: true,
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "user",
    freezeTableName: true,
  }
);

console.log("User Model defined");
export default User;
