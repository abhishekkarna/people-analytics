import Employee from "@db/models/employee.model";
import PerformanceData from "@db/models/performance_data.model";
import { PerformanceDataInstance } from "@interfaces/performance_data.interface";
import { QueryInterface } from "sequelize";

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  let performanceData = [
    {
      employee_id: 11,
      cycle: "2021H2",
      rating: "IC3.A",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    { employee_id: 103, cycle: "2022H1", rating: "IC3.B" },
    { employee_id: 30, cycle: "2022H2", rating: "IC4A" },
    { employee_id: 30, cycle: "2023H1", rating: "IC4.A" },
    { employee_id: 30, cycle: "2023H2", rating: "IC4.A" },
    { employee_id: 30, cycle: "2024H1", rating: "IC4.B" },
    { employee_id: 11, cycle: "2022H2", rating: "IC4B" },
    { employee_id: 11, cycle: "2023H1", rating: "IC5.A" },
    { employee_id: 11, cycle: "2023H2", rating: "IC5.A" },
    { employee_id: 11, cycle: "2024H1", rating: "IC5.B / M1.B" },
    { employee_id: 23, cycle: "2022H2", rating: "NEW HIRE" },
    { employee_id: 23, cycle: "2023H1", rating: "IC4.B" },
    { employee_id: 23, cycle: "2023H2", rating: "IC4.C" },
    { employee_id: 3, cycle: "2024H1", rating: "IC5.A / M1.A" },
    { employee_id: 3, cycle: "2022H2", rating: "NEW HIRE" },
    { employee_id: 3, cycle: "2023H1", rating: "IC2.C" },
    { employee_id: 3, cycle: "2023H2", rating: "IC3.C" },
    { employee_id: 3, cycle: "2024H1", rating: "IC3.C" },
    { employee_id: 22, cycle: "2024H1", rating: "IC5.A / M1.A" },
    { employee_id: 6, cycle: "2022H1", rating: "IC3.B" },
    { employee_id: 6, cycle: "2022H2", rating: "IC3C" },
    { employee_id: 6, cycle: "2023H1", rating: "IC4.A" },
    { employee_id: 6, cycle: "2023H2", rating: "IC4.A" },
    { employee_id: 6, cycle: "2024H1", rating: "IC4.A" },
    { employee_id: 0, cycle: "2022H1", rating: "IC3.C" },
    { employee_id: 0, cycle: "2022H2", rating: "IC4A" },
    { employee_id: 0, cycle: "2023H1", rating: "IC4.B" },
    { employee_id: 0, cycle: "2023H2", rating: "IC4.B" },
    { employee_id: 0, cycle: "2024H1", rating: "IC4.C" },
    { employee_id: 8, cycle: "2022H2", rating: "IC1C" },
    { employee_id: 8, cycle: "2023H1", rating: "IC2.A" },
    { employee_id: 8, cycle: "2023H2", rating: "IC2.B" },
    { employee_id: 8, cycle: "2024H1", rating: "IC2.B" },
    { employee_id: 12, cycle: "2022H2", rating: "IC1C" },
    { employee_id: 12, cycle: "2023H1", rating: "IC2.A" },
    { employee_id: 12, cycle: "2023H2", rating: "IC2.C" },
    { employee_id: 12, cycle: "2024H1", rating: "IC2.C" },
    { employee_id: 5, cycle: "2023H2", rating: "IC4.C" },
    { employee_id: 5, cycle: "2024H1", rating: "IC4.C" },
  ];
  performanceData = performanceData.map((data) => {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    return data;
  });
  await queryInterface.bulkInsert("performance_data", performanceData, {});
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  // await queryInterface.bulkDelete("performance_data", {}, {});
};
