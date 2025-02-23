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
import { CommonModule } from "@angular/common";
import { Observable, of } from "rxjs";
import { UserInfo } from "src/app/interfaces/user.interface";
import { MatCheckboxModule } from "@angular/material/checkbox";

interface CreateEmployeeInputData {
  employees$: Observable<any[]>;
  job_profiles$: Observable<any[]>;
  userInfo: UserInfo;
}

@Component({
  selector: "app-create-employee",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: "./create-employee.component.html",
  styleUrl: "./create-employee.component.scss",
})
export class CreateEmployeeComponent {
  addEmployeeForm: FormGroup = new FormGroup({});
  test$: Observable<string[]> = of([]);
  constructor(
    public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: CreateEmployeeInputData = {
      employees$: of([]),
      job_profiles$: of([]),
      userInfo: {},
    },
    private fb: FormBuilder
  ) {
    this.addEmployeeForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      job_profile_id: [null, Validators.required],
      manager_id: [null],
      is_login_allowed: [false, Validators.required],
      password: [null],
    });
    console.log(this.data.userInfo);
  }

  onSubmit() {
    if (this.addEmployeeForm.valid) {
      // Handle form submission
      console.log(this.addEmployeeForm.value);
      this.dialogRef.close(this.addEmployeeForm.value);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
