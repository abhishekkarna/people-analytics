import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import {
  Employee,
  iEmployeePayload,
} from "src/app/interfaces/employee.interface";
import { EmployeeService } from "src/app/services/employee.service";
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";
import { MatDialog } from "@angular/material/dialog";
import { CoreService } from "src/app/services/core.service";

@Component({
  selector: "app-employees",
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: "./employees.component.html",
  styleUrl: "./employees.component.scss",
})
export class EmployeesComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private settings: CoreService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  public employees$: Observable<Employee[]>;
  public displayedColumns: string[] = ["name", "email", "jobProfile", "view"];
  @Input() hideEmployeeOption = false;

  ngOnInit(): void {
    this.employees$ = this.employeeService.getEmployees();
  }

  openEmployeeDetails(id: string) {
    this.router.navigate(["dashboard", "employee", id]);
  }

  openAddEmployeeDialog() {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      data: {
        userInfo: this.settings.getUserInfo(),
        employees$: this.employeeService.getEmployees(),
        job_profiles$: this.employeeService.getJobProfiles(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log("Dialog result:", result);
        // Handle the form submission result
        this.employeeService.createEmployee(result).subscribe();
      }
    });
  }
}
