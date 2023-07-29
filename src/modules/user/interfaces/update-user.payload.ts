import { UpdateUserDto } from "../dto/update-user.dto";

export interface UpdateUserPayload extends UpdateUserDto {
  email_confirmation_token?: string;
  email_validated?: boolean;
}
