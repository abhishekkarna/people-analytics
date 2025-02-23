import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { environment } from "../../environments/environment";
import { map, Observable } from "rxjs";
import { Employee, iEmployeePayload } from "../interfaces/employee.interface";
const API_URLS = {
  GET_EMPLOYEES: "/employees",
  CREATE_EMPLOYEE: "/employees/add",
  GET_EMPLOYEE_BY_ID: (id: string) => `/employees/${id}`,
  GET_JOB_PROFILES: "/employees/job-profiles",
  GET_PERFORMANCE_DATA: (id: string) => `/employees/performance/${id}`,
  CREATE_TALENT_CHECKIN: (id: string) => `/employees/talent-check-in/${id}`,
  GET_TALENT_CHECKIN: (id: string) => `/employees/talent-check-in/${id}`,
};

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(private api: ApiService) {}

  /**
   * getEmployees
   */
  public getEmployees(): Observable<Employee[]> {
    return this.api.get(environment.BASE_API_URL + API_URLS.GET_EMPLOYEES, {});
  }

  public getEmployeeDetails(id: string) {
    return this.api.get(
      environment.BASE_API_URL + API_URLS.GET_EMPLOYEE_BY_ID(id),
      {}
    );
  }

  public getEmployeePerformanceData(id: string) {
    return this.api.get(
      environment.BASE_API_URL + API_URLS.GET_PERFORMANCE_DATA(id),
      {}
    );
  }

  public createTalentCheckin(id: string, iTalentPayload: any) {
    return this.api.post(
      environment.BASE_API_URL + API_URLS.CREATE_TALENT_CHECKIN(id),
      iTalentPayload
    );
  }

  public createEmployee(iEmployeePayload: iEmployeePayload) {
    return this.api.post(
      environment.BASE_API_URL + API_URLS.CREATE_EMPLOYEE,
      iEmployeePayload
    );
  }

  public getTalentCheckIn(id: string) {
    return this.api.get(
      environment.BASE_API_URL + API_URLS.CREATE_TALENT_CHECKIN(id),
      {}
    );
  }

  public getJobProfiles() {
    return this.api.get(
      environment.BASE_API_URL + API_URLS.GET_JOB_PROFILES,
      {}
    );
  }
}
