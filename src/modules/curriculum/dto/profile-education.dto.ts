import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { EducationLevel } from "../enums";
import { Type } from "class-transformer";
import { LocationDto } from "./location.dto";

export class ProfileEducation {
  @IsNotEmpty({
    context: {
      message: "missing-institution-name",
      userMessage: "Nome da instituição obrigatório",
    },
  })
  @IsString({
    context: {
      message: "invalid-institution-name",
      userMessage: "Nome da instituição inválido",
    },
  })
  institution_name: string;

  @IsNotEmpty({
    context: {
      message: "missing-course",
      userMessage: "Curso obrigatório",
    },
  })
  @IsString({
    context: {
      message: "invalid-course",
      userMessage: "Curso inválido",
    },
  })
  course: string;

  @IsNotEmpty({
    context: {
      message: "missing-degree",
      userMessage: "Grau de escolaridade obrigatório",
    },
  })
  @IsIn(Object.values(EducationLevel), {
    context: {
      message: "invalid-degree",
      userMessage: "Grau de escolaridade inválido",
    },
  })
  degree: EducationLevel;

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

  @IsNotEmpty({
    context: {
      message: "missing-location",
      userMessage: "Localização obrigatória",
    },
  })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
