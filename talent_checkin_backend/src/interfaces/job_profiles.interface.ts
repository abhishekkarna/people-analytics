import { Model, Optional } from "sequelize";

interface JobProfileAttributes {
  id: string;
  name: string;
  role_id: bigint;
}

interface JobProfileCreationAttributes
  extends Optional<JobProfileAttributes, "id"> {}

export interface JobProfileInstance
  extends Model<JobProfileAttributes, JobProfileCreationAttributes>,
    JobProfileAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
