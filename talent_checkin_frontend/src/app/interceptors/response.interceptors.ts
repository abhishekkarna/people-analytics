import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, map, switchMap, take } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { CoreService } from "../services/core.service";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private coreService: CoreService
  ) {}

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event) => {
        // Ensure the event is an HttpResponse
        if (event instanceof HttpResponse) {
          const response = event.body;

          if (response && response.data) {
            console.log("response.data", response.data);

            // Modify the response
            return event.clone({
              body: response.data.success ? response.data.data : response.data,
            });
          }
        }

        // Return the original event if no modifications were made
        return event;
      }),
      catchError((error) => {
        console.log("error--------------------------", error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        }
        if (error.error.message) {
          this.coreService.showErrorNotification(error.error.message);
        } else {
          this.coreService.showErrorNotification(error.statusText);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
          this.authService.setToken(token)
          return next.handle(
            req.clone({
              setHeaders: { Authorization: `Bearer ${token.accessToken}` },
            })
          );
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) =>
          next.handle(
            req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          )
        )
      );
    }
  }
}
