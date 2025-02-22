"use strict";

const employees = [
  {
    employee_id: 30,
    name: "Stephen Curry",
    email: "stephen@abc.com",
    job_profile: "Chief Innovation Officer (CIO)",
    manager_id: 101,
  },
  {
    employee_id: 11,
    name: "Klay Thompson",
    email: "klay@abc.com",
    job_profile: "Senior Brand Strategist",
    manager_id: 101,
  },
  {
    employee_id: 23,
    name: "Draymond Green",
    email: "draymond@abc.com",
    job_profile: "Head of Operations",
    manager_id: 101,
  },
  {
    employee_id: 3,
    name: "Chris Paul",
    email: "chris@abc.com",
    job_profile: "Client Relations Manager",
    manager_id: 102,
  },
  {
    employee_id: 22,
    name: "Andrew Wiggins",
    email: "andrew@abc.com",
    job_profile: "Lead Product Designer",
    manager_id: 102,
  },
  {
    employee_id: 6,
    name: "Jonathan Kuminga",
    email: "jon@abc.com",
    job_profile: "Junior Product Development Specialist",
    manager_id: 103,
  },
  {
    employee_id: 0,
    name: "Dario Šarić",
    email: "dario@abc.com",
    job_profile: "Project Coordinator",
    manager_id: 104,
  },
  {
    employee_id: 8,
    name: "Moses Moody",
    email: "moses@abc.com",
    job_profile: "Business Analyst",
    manager_id: 103,
  },
  {
    employee_id: 12,
    name: "Gary Payton II",
    email: "gary@abc.com",
    job_profile: "Risk Management Specialist",
    manager_id: 103,
  },
  {
    employee_id: 5,
    name: "Kevon Looney",
    email: "kevon@abc.com",
    job_profile: "Senior Resource Manager",
    manager_id: 104,
  },
  {
    employee_id: 101,
    name: "Steve Kerr",
    email: "steve@abc.com",
    job_profile: "People Manager",
    manager_id: 999,
  },
  {
    employee_id: 102,
    name: "Bruce Maxwell",
    email: "bruce@abc.com",
    job_profile: "People Manager",
    manager_id: 999,
  },
  {
    employee_id: 103,
    name: "Lisa Dunham",
    email: "lisa@abc.com",
    job_profile: "People Manager",
    manager_id: 999,
  },
  {
    employee_id: 104,
    name: "James Parker",
    email: "james@abc.com",
    job_profile: "People Manager",
    manager_id: 999,
  },
  {
    employee_id: 999,
    name: "Mike Dunleavy",
    email: "mike@abc.com",
    job_profile: "CEO",
    manager_id: null,
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await Promise.all(
      employees.map(async (emp) => {
        const [user] = await queryInterface.bulkInsert(
          "user",
          [
            {
              employee_id: emp.employee_id,
              name: emp.name,
              email: emp.email,
              password: null,
              is_login_allowed: false,
              refresh_token: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          { returning: true }
        );
        console.log("user-----sasdasdas---", user);
        return {
          employee_id: user.employee_id,
          job_profile: emp.job_profile,
          manager_id: emp.manager_id,
        };
      })
    );
    console.log("users------", users);
    await queryInterface.bulkInsert(
      "employee",
      users.map((user) => ({
        employee_id: user.employee_id,
        job_profile_id: 1,
        manager_id: user.manager_id || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employee", null, {});
    await queryInterface.bulkDelete("user", null, {});
  },
};
