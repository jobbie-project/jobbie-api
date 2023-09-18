import { IsNotEmpty, IsString, IsNumberString, IsDateString } from "class-validator";

export class FatecEducation {
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
  @IsNumberString(
    {},
    {
      context: {
        message: "invalid-fatec-cycle",
        userMessage: "Ciclo da Fatec inválido",
      },
    }
  )
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
}
