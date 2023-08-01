import { IsOptional, IsString } from "class-validator";

export class CreateStudentDto {
  @IsOptional()
  @IsString({
    context: {
      message: `invalid-phone`,
      userMessage: `Telefone inválido`,
    },
  })
  phone?: string;
}
