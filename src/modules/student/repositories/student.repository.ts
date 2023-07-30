import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../student.entity";

@Injectable()
export class StudentRepository {
  constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) {}
  async create(student: Student): Promise<Student> {
    const newStudent = await this.studentRepository.save(student);
    return newStudent;
  }
}
