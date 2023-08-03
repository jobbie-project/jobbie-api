import { User } from "@/modules/user/user.entity";
import { CreateCompanyDto } from "../dtos/create-company.dto";

export interface CreateCompanyPayload extends CreateCompanyDto {
  user: User;
}
