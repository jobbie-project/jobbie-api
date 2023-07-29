import { isFatecEmail } from "@/common/validators/student-email.validator";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResendEmailConfirmationDto {
  @IsNotEmpty({
    context: {
      message: `missing-email`,
      userMessage: `Email obrigatório`,
    },
  })
  @IsString({
    context: {
      message: `invalid-email`,
      userMessage: `Email inválido`,
    },
  })
  @IsEmail(
    {},
    {
      context: {
        message: `invalid-email`,
        userMessage: `Email inválido`,
      },
    }
  )
  @isFatecEmail({
    context: {
      message: `invalid-email`,
      userMessage: `Email não é da Fatec`,
    },
  })
  email: string;
}
