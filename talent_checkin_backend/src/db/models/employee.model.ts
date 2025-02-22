import { EmployeeInstance } from "@interfaces/employee.interface";
import { sequelize } from ".";
import { DataTypes } from "sequelize";

const Employee = sequelize.define<EmployeeInstance>(
  "Employee",
  {
    employee_id: {
      allowNull: false,
      type: DataTypes.TEXT,
      primaryKey: true,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    job_profile_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    manager_id: {
      allowNull: true,
      type: DataTypes.TEXT,
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    timestamps: true,
    tableName: "employee",
    freezeTableName: true,
  }
);
console.log("employee Model defined");

export default Employee;
