import { Model, Optional } from "sequelize";

interface RoleDataAttributes {
  id: bigint;
  name: string;
}

interface RoleDataCreationAttributes
  extends Optional<RoleDataAttributes, "id"> {}

export interface RoleDataInstance
  extends Model<RoleDataAttributes, RoleDataCreationAttributes>,
    RoleDataAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
