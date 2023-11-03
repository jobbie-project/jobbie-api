import { ContractType, JobTime, JobType } from "@/common/enums";
import { Optional } from "@nestjs/common";
import { IsArray, IsEnum, IsOptional } from "class-validator";

export class JobsListOptionsDto {
  @IsOptional()
  page?: number;

  @Optional()
  job_course_id?: string;

  @Optional()
  owner_company_id?: string;

  @Optional()
  owner_admin_id?: string;

  @IsOptional()
  per_page?: number;

  @IsOptional()
  type?: JobType[] | JobType;

  @IsOptional()
  code: string;

  @IsOptional()
  contract_type?: ContractType[] | ContractType;

  @IsOptional()
  @IsEnum(Object.values(JobTime))
  job_time?: JobTime;

  @IsOptional()
  position?: string;

  @IsOptional()
  order_by: "ASC" | "DESC";
}
