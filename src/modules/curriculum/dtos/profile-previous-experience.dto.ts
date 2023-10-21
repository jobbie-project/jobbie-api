import { IsDateString, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { LocationDto } from "./location.dto";
import { Type } from "class-transformer";

export class ProfilePreviousExperience {
  @IsNotEmpty({
    context: {
      message: "missing-company-name",
      userMessage: "Nome da empresa obrigatório",
    },
  })
  @IsString({
    context: {
      message: "invalid-company-name",
      userMessage: "Nome da empresa inválido",
    },
  })
  company_name: string;

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
      message: "missing-start-date",
      userMessage: "Data de início obrigatória",
    },
  })
  @IsDateString(
    {},
    {
      context: {
        message: "invalid-start-date",
        userMessage: "Data de início inválida",
      },
    }
  )
  start_date: Date;

  @IsOptional()
  @IsDateString(
    {},
    {
      context: {
        message: "invalid-end-date",
        userMessage: "Data de término inválida",
      },
    }
  )
  end_date?: Date;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsOptional()
  @IsString({
    context: {
      message: "invalid-description",
      userMessage: "Descrição inválida",
    },
  })
  description?: string;
}
