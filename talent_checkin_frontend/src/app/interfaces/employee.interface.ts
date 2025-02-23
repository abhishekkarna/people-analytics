export interface JobProfile {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  is_login_allowed: boolean;
  job_profile_id: string;
  manager_id: string | null;
  createdAt: string;
  updatedAt: string;
  jobProfile: JobProfile;
  manager: Employee | null;
}

export interface iEmployeePayload {
  name: string;
  email: string;
  is_login_allowed: boolean;
  job_profile_id: number;
  manager_id: string | null;
}
