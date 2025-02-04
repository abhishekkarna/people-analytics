import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { accessToken, refreshToken } = this.authService.getToken(); // Fetch token from AuthService
    if (accessToken) {
      const clonedRequest = req.clone({
        setHeaders: {
          authorization: accessToken,
          refreshToken: refreshToken || "",
        },
      });
      return next.handle(clonedRequest);
    }

    return next.handle(req); // If no token, continue without modifying the request
  }
}
