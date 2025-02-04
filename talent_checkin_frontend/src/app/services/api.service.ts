import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(url: string, _params: { [key: string]: string }): Observable<any> {
    const params = new HttpParams(_params);
    return this.http.get(url, {
      params,
    });
  }

  public post(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }
}
