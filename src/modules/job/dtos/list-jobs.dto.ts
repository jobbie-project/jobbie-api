import { ContractType, JobTime, JobType } from "@/common/enums";
import { IsEnum, IsOptional } from "class-validator";

export class JobsListOptionsDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  per_page?: number;

  @IsOptional()
  @IsEnum(Object.values(JobType))
  type?: JobType;

  @IsOptional()
  @IsEnum(Object.values(ContractType))
  contract_type?: ContractType;

  @IsOptional()
  @IsEnum(Object.values(JobTime))
  job_time?: JobTime;

  @IsOptional()
  position?: string;

  @IsOptional()
  order_by: "ASC" | "DESC";
}
