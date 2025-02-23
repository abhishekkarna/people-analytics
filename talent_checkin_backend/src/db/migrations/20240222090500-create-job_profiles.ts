import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable("job_profiles", {
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role_id: {
          allowNull: false,
          type: DataTypes.BIGINT,
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
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

      // await queryInterface.removeColumn("job_profiles", "type", {
      //   transaction,
      // });

      // Add the "role_id" column
      await queryInterface.addColumn(
        "job_profiles",
        "role_id",
        {
          allowNull: false,
          type: DataTypes.BIGINT,
          references: {
            model: "roles",
            key: "id",
          },
          onDelete: "SET NULL",
          onUpdate: "CASCADE",
        },
        { transaction }
      );
    }),

  down: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("job_profiles", { cascade: true });
    }),
};
