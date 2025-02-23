import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable("user", {
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
          defaultValue: false,
          allowNull: true,
          type: DataTypes.TEXT,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      });
    }),

  down: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("user", {
        cascade: true,
      });
    }),
};
