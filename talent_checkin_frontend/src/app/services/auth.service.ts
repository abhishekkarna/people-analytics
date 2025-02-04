import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { environment } from "../../environments/environment.development";
import { map, Observable } from "rxjs";
interface loginPayload {
  email: string | null;
  password: string | null;
}
interface loginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

const API_URLS = {
  LOGIN_ENDPOINT: "/auth/login",
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private api: ApiService) {}
  ACCESS_TOKEN_KEY = "accessToken";

  public login(eventPayload: any): Observable<loginResponse> {
    return this.api.post(
      environment.BASE_API_URL + API_URLS.LOGIN_ENDPOINT,
      eventPayload
    );
  }

  /**
   */
  public getToken() {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("accessToken");
    return { accessToken, refreshToken };
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    return !!token && !this.isTokenExpired(token);
  }

  // ✅ Store the access token
  setToken(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  // ✅ Remove the token (Logout)
  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  // ✅ Decode JWT Token to check expiration
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiry = payload.exp * 1000;
      return Date.now() > expiry;
    } catch (error) {
      return true; // If decoding fails, assume expired
    }
  }
}
