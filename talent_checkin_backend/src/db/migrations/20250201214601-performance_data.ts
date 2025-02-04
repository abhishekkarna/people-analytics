import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable("performance_data", {
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
      await queryInterface.dropTable("performance_data", { cascade: true });
    }),
};
