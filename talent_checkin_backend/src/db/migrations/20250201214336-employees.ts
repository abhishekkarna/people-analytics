import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable("employee", {
        employee_id: {
          allowNull: false,
          type: DataTypes.TEXT,
          primaryKey: true,
        },
        job_profile_id: {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "job_profiles",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
        manager_id: {
          allowNull: true,
          type: DataTypes.TEXT,
          references: {
            model: "user",
            key: "employee_id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
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
      await queryInterface.dropTable("employee", { cascade: true });
    }),
};
