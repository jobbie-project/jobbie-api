import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../student.entity";
import { CreateStudentPayload } from "../interfaces/create-student.payload";
import { UserQueryService } from "@/modules/user/services/user-query.service";
import { UserCreationService } from "@/modules/user/services/user-creation.service";

@Injectable()
export class StudentRepository {
  constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>) {}
  async create(createStudentPayload: CreateStudentPayload): Promise<Student> {
    const newStudent = await this.studentRepository.save(createStudentPayload);
    return newStudent;
  }

  async update(studentId: string, updateStudentPayload: Partial<Student>): Promise<Student> {
    const updatedStudent = await this.studentRepository.save({ id: studentId, ...updateStudentPayload });
    return updatedStudent;
  }
}
