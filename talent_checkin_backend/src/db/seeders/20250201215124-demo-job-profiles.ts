"use strict";

import { QueryInterface } from "sequelize";

const jobProfiles = [
  { name: "Chief Innovation Officer (CIO)", type: "superadmin" },
  { name: "Senior Brand Strategist", type: "staff" },
  { name: "Head of Operations", type: "staff" },
  { name: "Client Relations Manager", type: "admin" },
  { name: "Lead Product Designer", type: "staff" },
  { name: "Junior Product Development Specialist", type: "staff" },
  { name: "Project Coordinator", type: "staff" },
  { name: "Business Analyst", type: "staff" },
  { name: "Risk Management Specialist", type: "staff" },
  { name: "Senior Resource Manager", type: "admin" },
  { name: "People Manager", type: "admin" },
  { name: "CEO", type: "superadmin" },
];

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.bulkInsert(
    "job_profiles",
    jobProfiles.map(({ name, type }) => ({
      name,
      type,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    {}
  );
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.bulkDelete("job_profiles", {}, {});
};
