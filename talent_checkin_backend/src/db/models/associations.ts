import User from "@db/models/user.model";
import Employee from "@db/models/employee.model";
import JobProfile from "@db/models/job_profile.model";
import Role from "@db/models/role.model";
import Permission from "@db/models/permission.model";
import RolePermission from "@db/models/role_permission.model";

export const init_associations = () => {
  // One-to-One Relationship: User has One Employee
  User.hasOne(Employee, {
    foreignKey: "employee_id",
    sourceKey: "employee_id",
  });

  Employee.belongsTo(User, {
    foreignKey: "employee_id",
    targetKey: "employee_id",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });

  Employee.belongsTo(Employee, { foreignKey: "manager_id", as: "manager" });
  Employee.hasMany(Employee, { foreignKey: "manager_id", as: "subordinates" });

  JobProfile.hasMany(Employee, {
    foreignKey: "job_profile_id",
    as: "employees",
  });

  Employee.belongsTo(JobProfile, {
    foreignKey: "job_profile_id",
    as: "jobProfile",
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  });

  JobProfile.belongsTo(Role, { foreignKey: "role_id" });
  Role.hasMany(JobProfile, { foreignKey: "role_id" });

  // Many-to-Many Relationship
  Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "roleId",
  });
  Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permissionId",
  });
  console.log("Associations established");
  return { User, Employee, JobProfile, Role, Permission, RolePermission };
};
