import User from "@db/models/user.model";
import Employee from "@db/models/employee.model";
import JobProfile from "@db/models/job_profile.model";
import { sequelize, Sequelize } from ".";
console.log("----------------------creating associating");

// One-to-One Relationship: User has One Employee
User.hasOne(Employee);

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

export default { User, Employee, JobProfile };
