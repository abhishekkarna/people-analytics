import { Routes } from "@angular/router";
import { LoggedInComponent } from "../layouts/logged-in/logged-in.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmployeeDetailsComponent } from "./employees/employee-details/employee-details.component";
import { EmployeesComponent } from "./employees/employees.component";

export const PagesRoutes: Routes = [
  {
    path: "",
    component: LoggedInComponent,
    children: [
      {
        path: "employee/:id",
        component: EmployeeDetailsComponent,
      },
      {
        path: "employee",
        component: EmployeesComponent,
        pathMatch: "full",
      },
      {
        path: "",
        component: DashboardComponent,
        pathMatch: "full",
      },
    ],
  },
];
