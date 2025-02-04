import { Routes } from "@angular/router";
import { LoggedInComponent } from "../layouts/logged-in/logged-in.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";

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
        path: "",
        component: DashboardComponent,
        pathMatch: "full",
      },
    ],
  },
];
