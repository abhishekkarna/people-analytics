"use strict";

import { QueryInterface } from "sequelize";

const jobProfiles = [
  { name: "Chief Innovation Officer (CIO)", role_id: 3 },
  { name: "Senior Brand Strategist", role_id: 1 },
  { name: "Head of Operations", role_id: 1 },
  { name: "Client Relations Manager", role_id: 2 },
  { name: "Lead Product Designer", role_id: 1 },
  { name: "Junior Product Development Specialist", role_id: 1 },
  { name: "Project Coordinator", role_id: 1 },
  { name: "Business Analyst", role_id: 1 },
  { name: "Risk Management Specialist", role_id: 1 },
  { name: "Senior Resource Manager", role_id: 2 },
  { name: "People Manager", role_id: 2 },
  { name: "CEO", role_id: 3 },
];

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.bulkInsert(
    "job_profiles",
    jobProfiles.map(({ name, role_id }) => ({
      name,
      role_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    {}
  );
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.bulkDelete("job_profiles", {}, {});
};
