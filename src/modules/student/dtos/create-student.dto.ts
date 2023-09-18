import { FatecEducation } from "@/modules/curriculum/dtos/fatec-education.dto";
import { ProfileAddress } from "@/modules/curriculum/dtos/profile-address.dto";
import { ProfileEducation } from "@/modules/curriculum/dtos/profile-education.dto";
import { ProfilePreviousExperience } from "@/modules/curriculum/dtos/profile-previous-experience.dto";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateStudentDto {
  @IsOptional()
  @IsString({
    context: {
      message: `invalid-phone`,
      userMessage: `Telefone inválido`,
    },
  })
  phone?: string;

  @IsOptional()
  @IsString({
    context: {
      message: `invalid-name`,
      userMessage: `Nome inválido`,
    },
  })
  name?: string;

  @ValidateNested()
  @Type(() => ProfileEducation)
  education: ProfileEducation[];

  @ValidateNested()
  @Type(() => ProfilePreviousExperience)
  previous_experience: ProfilePreviousExperience[];

  @ValidateNested()
  @Type(() => ProfileAddress)
  address: ProfileAddress;

  @ValidateNested()
  @Type(() => FatecEducation)
  fatec_education: FatecEducation;

  @IsOptional()
  @IsArray({
    context: {
      message: "invalid-certifications",
      userMessage: "Certificações inválidas",
    },
  })
  certifications?: string[];
}
