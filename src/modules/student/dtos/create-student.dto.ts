import { CreateCurriculumDto } from "@/modules/curriculum/dto/create-curriculum.dto";
import { ProfileAddress } from "@/modules/curriculum/dto/profile-address.dto";
import { ProfileEducation } from "@/modules/curriculum/dto/profile-education.dto";
import { ProfilePreviousExperience } from "@/modules/curriculum/dto/profile-previous-experience.dto";
import { EducationLevel } from "@/modules/curriculum/enums";
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateStudentDto {
  @IsOptional()
  @IsString({
    context: {
      message: `invalid-phone`,
      userMessage: `Telefone inválido`,
    },
  })
  phone?: string;

  @ValidateNested()
  @Type(() => ProfileEducation)
  curriculum: CreateCurriculumDto;
}
