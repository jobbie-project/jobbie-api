import { FindOneStudentOptions } from "@/modules/student/interfaces/find-one-student-options.interface";
import { StudentRepository } from "@/modules/student/repositories/student.repositoy";
import { Student } from "@/modules/student/student.entity";

export class StudentQueryService {
  constructor(private userRepository: StudentRepository) {}

  async findOne(options: FindOneStudentOptions): Promise<Student> {
    return this.userRepository.findOne(options);
  }
}
