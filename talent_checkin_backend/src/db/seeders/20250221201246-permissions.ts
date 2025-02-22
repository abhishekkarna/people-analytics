module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert Roles
    const roles = [
      { name: "staff", createdAt: new Date(), updatedAt: new Date() },
      { name: "admin", createdAt: new Date(), updatedAt: new Date() },
      { name: "superadmin", createdAt: new Date(), updatedAt: new Date() },
    ];

    await queryInterface.bulkInsert("roles", roles, {});

    // Fetch inserted roles to get their IDs
    const roleRecords = await queryInterface.sequelize.query(
      `SELECT id, name FROM roles;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const roleMap = roleRecords.reduce((acc, role) => {
      acc[role.name] = role.id;
      return acc;
    }, {});

    // Insert Permissions
    const permissions = [
      {
        name: "employee/create_record",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "employee/read_record",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "employee/update_record",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "employee/delete_record",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("permissions", permissions, {});

    // Fetch inserted permissions
    const permissionRecords = await queryInterface.sequelize.query(
      `SELECT id, name FROM permissions;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const permissionMap = permissionRecords.reduce((acc, permission) => {
      acc[permission.name] = permission.id;
      return acc;
    }, {});

    // Define Role-Permission Mappings
    const rolePermissions = [
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["employee/read_record"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["employee/update_record"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["admin"],
        permissionId: permissionMap["employee/delete_record"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        roleId: roleMap["superadmin"],
        permissionId: permissionMap["employee/create_record"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["superadmin"],
        permissionId: permissionMap["employee/read_record"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["superadmin"],
        permissionId: permissionMap["employee/update_record"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        roleId: roleMap["superadmin"],
        permissionId: permissionMap["employee/delete_record"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("role_permissions", rolePermissions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("role_permissions", null, {});
    await queryInterface.bulkDelete("permissions", null, {});
    await queryInterface.bulkDelete("roles", null, {});
  },
};
