import { sequelize } from ".";
import { DataTypes } from "sequelize";
import { UserInstance } from "@interfaces/user.interface";
import Employee from "./employee.model";
import JobProfile from "./job_profile.model";

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
      allowNull: true,
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
User.hasOne(Employee, { foreignKey: "employee_id", sourceKey: "employee_id" });

Employee.belongsTo(User, {
  foreignKey: "employee_id",
  targetKey: "employee_id",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

Employee.belongsTo(Employee, { foreignKey: "manager_id", as: "manager" });
Employee.hasMany(Employee, { foreignKey: "manager_id", as: "subordinates" });

// JobProfile can have many Employees
JobProfile.hasMany(Employee, {
  foreignKey: "job_profile_id",
  as: "employees", // Alias for employees with this job profile
});

Employee.belongsTo(JobProfile, {
  foreignKey: "job_profile_id", // Foreign key referencing JobProfile
  as: "jobProfile", // Alias for the relationship
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});

console.log("User Model defined");
export default User;
