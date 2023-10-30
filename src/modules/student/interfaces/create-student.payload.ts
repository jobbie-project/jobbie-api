import { User } from "@/modules/user/user.entity";
import { Curriculum } from "@/modules/curriculum/curriculum.entity";
import { StudentShift } from "../enums";

export interface CreateStudentPayload {
  user: User;
  phone?: string;
  curriculum: Curriculum;
  shift: StudentShift;
}
