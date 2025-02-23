import { DataTypes } from "sequelize";
import { sequelize } from ".";
import { PermissionDataInstance } from "@interfaces/permission.interface";

const Permission = sequelize.define<PermissionDataInstance>(
  "Permission",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "permissions",
    freezeTableName: true,
  }
);

export default Permission;
