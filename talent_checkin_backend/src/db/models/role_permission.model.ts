import { DataTypes } from "sequelize";
import { sequelize } from ".";

const RolePermission = sequelize.define(
  "RolePermission",
  {},
  {
    timestamps: true,
    tableName: "role_permission",
    freezeTableName: true,
  }
);

export default RolePermission;
