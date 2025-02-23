import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { CreateTalentCheckinComponent } from "./create-talent-checkin/create-talent-checkin.component";
import { EmployeeTalentData } from "src/app/interfaces/employeeTalent.interface";
import { EmployeeService } from "src/app/services/employee.service";

@Component({
  selector: "app-talent-checkin",
  imports: [MatTableModule, MatButtonModule],
  standalone: true,
  templateUrl: "./talent-checkin.component.html",
  styleUrl: "./talent-checkin.component.scss",
})
export class TalentCheckinComponent {
  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {}
  @Input() data: any;
  @Input() employeeId: string;
  displayedColumns = [
    "cycle",
    "high_impact_talent",
    "needs_improvement_talent",
    "strengths",
    "opportunity_areas",
    "flight_risk",
    "career_aspirations",
    "planned_actions",
    "session_notes",
    "action_plan_highlights",
    "quarterly_progress_update",
  ];

  openTalentCheckinDialog() {
    const dialogRef = this.dialog.open(CreateTalentCheckinComponent, {
      data: {
        employeeId: this.employeeId,
      },
    });

    dialogRef.afterClosed().subscribe((result: EmployeeTalentData) => {
      if (result) {
        console.log("Dialog result:", result);
        // Handle the form submission result
        this.employeeService
          .createTalentCheckin(this.employeeId, result)
          .subscribe();
      }
    });
  }
}
