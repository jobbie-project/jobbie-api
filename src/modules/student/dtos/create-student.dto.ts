import { CreateCurriculumDto } from "@/modules/curriculum/dto/create-curriculum.dto";
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
  @Type(() => CreateCurriculumDto)
  curriculum: CreateCurriculumDto;
}
