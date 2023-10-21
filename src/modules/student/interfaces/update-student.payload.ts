import { CreateStudentDto } from "../dtos/create-student.dto";

export class UpdateStudentPayload extends CreateStudentDto {
  curriculumId: string;
}
