import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../repositories/student.repository";

@Injectable()
export class StudentCreationService {
  constructor(private readonly studentRepository: StudentRepository) {}
  async create(student) {
    const newStudent = await this.studentRepository.create(student);
    return newStudent;
  }
}
