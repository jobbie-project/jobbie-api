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
  email: string;
}
