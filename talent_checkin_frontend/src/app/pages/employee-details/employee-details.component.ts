import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  BehaviorSubject,
  catchError,
  forkJoin,
  Observable,
  of,
  switchMap,
} from "rxjs";
import { EmployeeService } from "src/app/services/employee.service";
import { PerformanceDataComponent } from "./performance-data/performance-data.component";
import { TalentCheckinComponent } from "./talent-checkin/talent-checkin.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-employee-details",
  standalone: true,
  imports: [
    CommonModule,
    PerformanceDataComponent,
    TalentCheckinComponent,
    MatDividerModule,
  ],
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.scss"],
})
export class EmployeeDetailsComponent {
  employeeId$: BehaviorSubject<string> = new BehaviorSubject("");
  employeeDetails$: Observable<any>;
  private _snackBar = inject(MatSnackBar);
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const employee_id = params.get("id");
      if (!employee_id) return;

      this.employeeId$.next(employee_id);
    });

    this.employeeDetails$ = this.employeeId$.pipe(
      switchMap((employeeId) => {
        const basicDetails$ =
          this.employeeService.getEmployeeDetails(employeeId);
        const talentCheckinDetails$ =
          this.employeeService.getTalentCheckIn(employeeId);
        const performanceDetails$ =
          this.employeeService.getEmployeePerformanceData(employeeId);
        return forkJoin([
          basicDetails$,
          talentCheckinDetails$,
          performanceDetails$,
        ]);
      }),
      catchError((err) => {
        console.log("error", err);
        this._snackBar.open(err.statusText, undefined, {
          direction: "ltr",
          verticalPosition: "top",
          horizontalPosition: "right",
          duration: 3000,
        });
        return of(err);
      })
    );
  }
}
