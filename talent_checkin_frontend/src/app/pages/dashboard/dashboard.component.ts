import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Employee } from "src/app/interfaces/employee.interface";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: "app-dashboard",
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}
  public employees$: Observable<Employee[]>;
  public displayedColumns: string[] = ["name", "email", "jobProfile", "view"];

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees();
  }

  openEmployeeDetails(id: string) {
    this.router.navigate(["dashboard", "employee", id]);
  }
}
