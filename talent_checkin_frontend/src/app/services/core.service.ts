import { inject, Injectable, signal } from "@angular/core";
import { AppSettings, defaults } from "../config";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserInfo } from "../interfaces/user.interface";

@Injectable({
  providedIn: "root",
})
export class CoreService {
  private optionsSignal = signal<AppSettings>(defaults);
  private userInfoSignal = signal<UserInfo>({});
  private _snackBar = inject(MatSnackBar);

  getOptions() {
    return this.optionsSignal();
  }

  setOptions(options: Partial<AppSettings>) {
    this.optionsSignal.update((current) => ({
      ...current,
      ...options,
    }));
  }

  getUserInfo() {
    return this.userInfoSignal();
  }

  setUserInfo(options: Partial<UserInfo>) {
    this.userInfoSignal.update((current) => ({
      ...current,
      ...options,
    }));
  }

  showErrorNotification(errorText: any) {
    this._snackBar.open(errorText, undefined, {
      direction: "ltr",
      verticalPosition: "top",
      horizontalPosition: "right",
      duration: 3000,
    });
  }
}
