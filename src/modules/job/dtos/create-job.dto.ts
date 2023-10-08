import { ContractType, JobTime, JobType } from "@/common/enums";
import { LocationDto } from "@/modules/curriculum/dtos/location.dto";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";

export class CreateJobDto {
  @IsNotEmpty({
    context: {
      message: "missing-position",
      userMessage: "Cargo obrigatório",
    },
  })
  @IsString({
    context: {
      message: "invalid-position",
      userMessage: "Cargo inválido",
    },
  })
  position: string;

  @IsNotEmpty({
    context: {
      message: "missing-description",
      userMessage: "Descrição obrigatória",
    },
  })
  @IsString({
    context: {
      message: "invalid-description",
      userMessage: "Descrição inválida",
    },
  })
  description: string;

  @IsNotEmpty({
    context: {
      message: "missing-company_name",
      userMessage: "Nome da empresa obrigatório",
    },
  })
  @IsString({
    context: {
      message: "invalid-company_name",
      userMessage: "Nome da empresa inválido",
    },
  })
  company_name: string;

  @IsNotEmpty({
    context: {
      message: "missing-salary",
      userMessage: "Salário obrigatório",
    },
  })
  @IsNumber(
    {},
    {
      context: {
        message: "invalid-salary",
        userMessage: "Salário inválido",
      },
    }
  )
  salary: number;

  @IsOptional()
  @IsNumberString(
    {},
    {
      context: {
        message: "invalid-num_positions",
        userMessage: "Número de vagas inválido",
      },
    }
  )
  num_positions: string;

  @IsNotEmpty({
    context: {
      message: "missing-owner_name",
      userMessage: "Nome do responsável obrigatório",
    },
  })
  @IsString({
    context: {
      message: "invalid-owner_name",
      userMessage: "Nome do responsável inválido",
    },
  })
  owner_name: string;

  @IsNotEmpty({
    context: {
      message: "missing-owner_email",
      userMessage: "Email do responsável obrigatório",
    },
  })
  @IsString({
    context: {
      message: "invalid-owner_email",
      userMessage: "Email do responsável inválido",
    },
  })
  owner_email: string;

  @IsNotEmpty({
    context: {
      message: "missing-type",
      userMessage: "Tipo da vaga obrigatório",
    },
  })
  @IsEnum(Object.values(JobType))
  type: JobType;

  @IsNotEmpty({
    context: {
      message: "missing-contract_type",
      userMessage: "Tipo de contrato obrigatório",
    },
  })
  @IsEnum(Object.values(ContractType))
  contract_type: ContractType;

  @IsNotEmpty({
    context: {
      message: "missing-job_time",
      userMessage: "Tipo de jornada obrigatório",
    },
  })
  @IsEnum(Object.values(JobTime))
  job_time: JobTime;

  @ValidateIf((o) => o.type === JobType.FACE_TO_FACE)
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
