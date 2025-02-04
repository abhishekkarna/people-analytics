import { Model, Optional } from "sequelize";

interface TalentCheckinAttributes {
  id?: bigint;
  employee_id: bigint;
  cycle: string;
  high_impact_talent: boolean;
  needs_improvement_talent: boolean;
  strengths: string;
  opportunity_areas: string;
  flight_risk: string;
  career_aspirations: string;
  planned_actions: string;
  session_notes: string;
  action_plan_highlights: string;
  quarterly_progress_update: string;
}

export interface TalentCheckinCreationAttributes
  extends Optional<TalentCheckinAttributes, "id"> {}

export interface TalentCheckinInstance
  extends Model<TalentCheckinAttributes, TalentCheckinCreationAttributes>,
    TalentCheckinAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
