import { UpdateUserDto } from "../dtos/update-user.dto";

export interface UpdateUserPayload extends UpdateUserDto {
  email_confirmation_token?: string;
  email_validated?: boolean;
}
