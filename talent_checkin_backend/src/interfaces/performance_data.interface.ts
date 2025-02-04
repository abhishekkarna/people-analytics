import { Model, Optional } from "sequelize";

interface PerformanceDataAttributes {
  id: bigint;
  employee_id: bigint;
  cycle: string;
  rating: string;
}

interface PerformanceDataCreationAttributes
  extends Optional<PerformanceDataAttributes, "id"> {}

export interface PerformanceDataInstance
  extends Model<PerformanceDataAttributes, PerformanceDataCreationAttributes>,
    PerformanceDataAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
