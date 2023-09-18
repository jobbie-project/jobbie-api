import { IsNotEmpty, IsString } from "class-validator";

export class ProfileAddress {
  @IsNotEmpty({
    context: {
      message: "missing-street",
      userMessage: "Rua obrigatória",
    },
  })
  @IsString({
    context: {
      message: "invalid-street",
      userMessage: "Rua inválida",
    },
  })
  street: string;

  @IsNotEmpty({
    context: {
      message: "missing-city",
      userMessage: "Cidade obrigatória",
    },
  })
  @IsString({
    context: {
      message: "invalid-city",
      userMessage: "Cidade inválida",
    },
  })
  city: string;

  @IsNotEmpty({
    context: {
      message: "missing-state",
      userMessage: "Estado obrigatório",
    },
  })
  @IsString({
    context: {
      message: "invalid-state",
      userMessage: "Estado inválido",
    },
  })
  state: string;

  @IsNotEmpty({
    context: {
      message: "missing-zip-code",
      userMessage: "CEP obrigatório",
    },
  })
  @IsString({
    context: {
      message: "invalid-zip-code",
      userMessage: "CEP inválido",
    },
  })
  zip_code: string;
}
