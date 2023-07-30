import { User } from "@/modules/user/user.entity";
import { CreateStudentDto } from "../dtos/create-student.dto";

export interface CreateStudentPayload extends CreateStudentDto {
  user: User;
}
