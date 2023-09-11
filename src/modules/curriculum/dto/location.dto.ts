import { IsNotEmpty, IsString } from "class-validator";

export class LocationDto {
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
}
