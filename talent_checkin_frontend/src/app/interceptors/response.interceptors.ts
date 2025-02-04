import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        // Check if the event is a HttpResponse
        if (event instanceof HttpResponse) {
          // Map the response to `response.data`
          const response = event.body;
          if (response && response.data) {
            event = event.clone({ body: response.data });
            console.log("------", event);
          }
        }
      })
    );
  }
}
