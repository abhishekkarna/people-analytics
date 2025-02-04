import { PerformanceDataInstance } from "@interfaces/performance_data.interface";
import { sequelize } from ".";
import { DataTypes } from "sequelize";

const PerformanceData = sequelize.define<PerformanceDataInstance>(
  "PerformanceData",
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
      type: DataTypes.TEXT,
      references: {
        model: "user",
        key: "employee_id",
      },
    },
    cycle: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    rating: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    tableName: "performance_data",
    freezeTableName: true,
  }
);
export default PerformanceData;
