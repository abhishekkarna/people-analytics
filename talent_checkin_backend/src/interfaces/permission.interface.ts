import { Model, Optional } from "sequelize";

interface PermissionDataAttributes {
  id: bigint;
  name: string;
}

interface PermissionDataCreationAttributes
  extends Optional<PermissionDataAttributes, "id"> {}

export interface PermissionDataInstance
  extends Model<PermissionDataAttributes, PermissionDataCreationAttributes>,
    PermissionDataAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
