import { CreateUserDto } from "../dto/create-user.dto";

export interface CreateUserPayload extends CreateUserDto {
  email_confirmation_token: string;
}
