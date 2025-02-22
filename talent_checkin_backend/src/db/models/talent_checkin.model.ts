import { sequelize } from ".";
import { DataTypes } from "sequelize";
import { TalentCheckinInstance } from "@interfaces/talent_checkin.interface";

const TalentCheckin = sequelize.define<TalentCheckinInstance>(
  "TalentCheckin",
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
  },
  {
    timestamps: true,
    tableName: "talent_checkin",
    freezeTableName: true,
  }
);
export default TalentCheckin;
