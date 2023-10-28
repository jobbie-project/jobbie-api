import { CreateJobDto } from "../dtos/create-job.dto";

export interface CreateJobPayload extends CreateJobDto {
  owner_company?: any;
  owner_admin?: any;
  code: string;
  salary: number;
}
