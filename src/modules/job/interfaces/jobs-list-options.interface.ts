import { ContractType, JobTime, JobType } from "@/common/enums";

export interface JobsListOptions {
  page?: number;
  per_page?: number;
  type?: JobType;
  contract_type?: ContractType;
  job_time?: JobTime;
  title?: string;
}
