import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { ProfileAddress } from "./profile-address.dto";
import { ProfileEducation } from "./profile-education.dto";
import { ProfilePreviousExperience } from "./profile-previous-experience.dto";

export class CreateCurriculumDto {
  @ValidateNested()
  @Type(() => ProfileEducation)
  education: ProfileEducation[];

  @ValidateNested()
  @Type(() => ProfilePreviousExperience)
  previous_experience: ProfilePreviousExperience[];

  @ValidateNested()
  @Type(() => ProfileAddress)
  address: ProfileAddress;

  @IsNotEmpty({
    context: {
      message: "missing-fatec-institution",
      userMessage: "Instituição da Fatec obrigatória",
    },
  })
  @IsString({
    context: {
      message: "invalid-fatec-institution",
      userMessage: "Instituição da Fatec inválida",
    },
  })
  fatec_institution: string;

  @IsNotEmpty({
    context: {
      message: "missing-fatec-course",
      userMessage: "Curso da Fatec obrigatório",
    },
  })
  @IsString({
    context: {
      message: "invalid-fatec-course",
      userMessage: "Curso da Fatec inválido",
    },
  })
  fatec_course: string;

  @IsNotEmpty({
    context: {
      message: "missing-fatec-cycle",
      userMessage: "Ciclo da Fatec obrigatório",
    },
  })
  @IsNumber(
    {},
    {
      context: {
        message: "invalid-fatec-cycle",
        userMessage: "Ciclo da Fatec inválido",
      },
    }
  )
  @Min(1)
  @Max(6)
  fatec_cycle: number;

  @IsNotEmpty({
    context: {
      message: "missing-fatec-start-date",
      userMessage: "Data de início da Fatec obrigatória",
    },
  })
  @IsDateString(
    {},
    {
      context: {
        message: "invalid-fatec-start-date",
        userMessage: "Data de início da Fatec inválida",
      },
    }
  )
  fatec_start_date: Date;

  @IsOptional()
  @IsArray({
    context: {
      message: "invalid-certifications",
      userMessage: "Certificações inválidas",
    },
  })
  certifications?: string[];

  // @IsOptional()
  // @IsString({
  //   context: {
  //     message: "invalid-github-url",
  //     userMessage: "URL do GitHub inválida",
  //   },
  // })
  // github_url?: string;

  // @IsOptional()
  // @IsString({
  //   context: {
  //     message: "invalid-linkedin-url",
  //     userMessage: "URL do LinkedIn inválida",
  //   },
  // })
  // linkedin_url?: string;

  // @IsOptional()
  // @IsString({
  //   context: {
  //     message: "invalid-portfolio-url",
  //     userMessage: "URL do Portfólio inválida",
  //   },
  // })
  // portfolio_url?: string;
}
