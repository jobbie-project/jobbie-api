import { IsIn, IsOptional, IsString } from "class-validator";
import { CompanySize } from "../enums";

export class CreateCompanyDto {
  @IsOptional()
  @IsString({
    context: {
      message: `invalid-logo_url`,
      userMessage: `URL da logo inválida`,
    },
  })
  logo_url?: string;

  @IsOptional()
  @IsString({
    context: {
      message: `invalid-website_url`,
      userMessage: `URL do site inválida`,
    },
  })
  website_url?: string;

  @IsOptional()
  @IsString({
    context: {
      message: `invalid-description`,
      userMessage: `Descrição inválida`,
    },
  })
  description?: string;

  @IsOptional()
  @IsString({
    context: {
      message: `invalid-phone`,
      userMessage: `Telefone inválido`,
    },
  })
  phone?: string;

  @IsOptional()
  @IsIn(Object.values(CompanySize), {
    context: {
      message: `invalid-size`,
      userMessage: `Tamanho inválido`,
    },
  })
  @IsString({
    context: {
      message: `invalid-size`,
      userMessage: `Tamanho inválido`,
    },
  })
  size?: CompanySize;
}
