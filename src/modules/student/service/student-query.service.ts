import { FindOneStudentOptions } from "../interfaces/find-one-student-options.interface";
import { StudentRepository } from "../repositories/student.repositoy";
import { Student } from "../student.model";

export class StudentQueryService {
  constructor(private userRepository: StudentRepository) {}

  async findOne(options: FindOneStudentOptions): Promise<Student> {
    return this.userRepository.findOne(options);
  }
}
