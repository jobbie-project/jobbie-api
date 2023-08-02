import { CreateUserDto } from "../dtos/create-user.dto";

export interface CreateUserPayload extends CreateUserDto {
  email_confirmation_token: string;
}
