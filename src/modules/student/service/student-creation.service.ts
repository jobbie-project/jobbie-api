import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../repositories/student.repository";
import { User } from "@/modules/user/user.entity";
import { CreateStudentDto } from "../dtos/create-student.dto";

@Injectable()
export class StudentCreationService {
  constructor(private readonly studentRepository: StudentRepository) {}
  async create(user: User, student: CreateStudentDto) {
    const newStudent = await this.studentRepository.create({ ...student, user });
    return newStudent;
  }
}
