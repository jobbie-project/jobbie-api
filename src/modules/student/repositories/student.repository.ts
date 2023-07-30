import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../student.entity";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { CreateStudentPayload } from "../interfaces/create-student.payload";
import { UserRole } from "@/modules/user/enums";

@Injectable()
export class StudentRepository {
  constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>, private userRepository: UserRepository) {}
  async create(createStudentPayload: CreateStudentPayload): Promise<Student> {
    const newStudent = await this.studentRepository.save(createStudentPayload);
    const user = await this.userRepository.findOne({ key: "id", value: createStudentPayload.user.id });
    user.role = UserRole.STUDENT;
    user.student = newStudent;
    await this.userRepository.update(user.id, user);
    return newStudent;
  }
}
