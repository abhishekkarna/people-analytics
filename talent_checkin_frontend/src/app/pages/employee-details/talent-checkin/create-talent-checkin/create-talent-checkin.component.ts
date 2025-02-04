// employee-input-dialog.component.ts
import { Component, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-create-talent-checkin",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./create-talent-checkin.component.html",
  styleUrl: "./create-talent-checkin.component.scss",
})
export class CreateTalentCheckinComponent {
  talentCheckinForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<CreateTalentCheckinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.talentCheckinForm = this.fb.group({
      employee_id: [data.employeeId, Validators.required],
      cycle: ["Q1-2025", Validators.required],
      high_impact_talent: ["", Validators.required],
      needs_improvement_talent: ["", Validators.required],
      strengths: ["", Validators.required],
      opportunity_areas: ["", Validators.required],
      flight_risk: [""],
      career_aspirations: ["", Validators.required],
      planned_actions: ["", Validators.required],
      session_notes: [""],
      action_plan_highlights: [""],
      quarterly_progress_update: [""],
    });
    console.log(this.talentCheckinForm.value);
  }

  onSubmit() {
    if (this.talentCheckinForm.valid) {
      // Handle form submission
      console.log(this.talentCheckinForm.value);
      this.dialogRef.close(this.talentCheckinForm.value);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
