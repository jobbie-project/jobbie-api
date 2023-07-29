import { IsString, IsNotEmpty } from "class-validator";

export class VerifyEmailDto {
  @IsNotEmpty({
    context: {
      message: `missing-token`,
      userMessage: `Token obrigatório`,
    },
  })
  @IsString({
    context: {
      message: `invalid-token`,
      userMessage: `Token inválido`,
    },
  })
  token: string;
}
