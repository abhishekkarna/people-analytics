import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable("talent_checkin", {
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
          type: DataTypes.STRING,
        },
        high_impact_talent: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
        needs_improvement_talent: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
        strengths: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        opportunity_areas: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        flight_risk: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        career_aspirations: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        planned_actions: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        session_notes: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        action_plan_highlights: {
          allowNull: true,
          type: DataTypes.STRING,
        },
        quarterly_progress_update: {
          allowNull: true,
          type: DataTypes.STRING,
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
      await queryInterface.dropTable("talent_checkin", { cascade: true });
    }),
};
