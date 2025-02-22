import { JobProfileInstance } from "@interfaces/job_profiles.interface";
import { sequelize } from ".";
import { DataTypes } from "sequelize";

const JobProfile = sequelize.define<JobProfileInstance>(
  "JobProfile",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.BIGINT,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    type: {
      allowNull: false,
      type: DataTypes.ENUM("staff", "admin", "superadmin"),
    },
  },
  {
    timestamps: true,
    tableName: "job_profiles",
    freezeTableName: true,
  }
);

export default JobProfile;
