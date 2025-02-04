import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/material.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-side-login",
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./side-login.component.html",
  styleUrl: "./side-login.component.scss",
  standalone: true,
})
export class AppSideLoginComponent {
  constructor(private router: Router, private authservice: AuthService) {}

  authForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  get f() {
    return this.authForm.controls;
  }

  submit() {
    const { email, password } = this.authForm.value;
    if (!email || !password) return;

    this.authservice.login(this.authForm.value).subscribe({
      next: ({ accessToken, refreshToken }) => {
        if (!accessToken || !refreshToken) throw new Error("Token not found");
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        this.router.navigate(["/dashboard"]);
      },
    });
  }
}
