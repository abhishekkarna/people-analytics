import { DataTypes } from "sequelize";
import { sequelize } from ".";
import { RoleDataInstance } from "@interfaces/role.interface";

const Role = sequelize.define<RoleDataInstance>(
  "Role",
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
    tableName: "role",
    freezeTableName: true,
  }
);

export default Role;
