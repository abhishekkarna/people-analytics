import { UserWithRelations } from "@interfaces/user.interface";

export interface UserInfo {
  name: String;
  email: String;
  employee_id: String;
  manager_id: number;
  job_profile_id: String;
  job_profile: String;
  role: String;
}
export const userInfoResponseMapper = (
  raw_response: UserWithRelations
): UserInfo => {
  return {
    name: raw_response.name,
    email: raw_response.email,
    employee_id: raw_response?.Employee?.employee_id!,
    manager_id: raw_response?.Employee?.manager_id!,
    job_profile_id: raw_response?.Employee?.jobProfile?.id!,
    job_profile: raw_response?.Employee?.jobProfile?.name!,
    role: raw_response?.Employee?.jobProfile?.Role?.name!,
  };
};
