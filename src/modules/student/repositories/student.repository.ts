import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../student.entity";
import { CreateStudentPayload } from "../interfaces/create-student.payload";
import { UserRole } from "@/modules/user/enums";
import { UserQueryService } from "@/modules/user/service/user-query.service";

@Injectable()
export class StudentRepository {
  constructor(@InjectRepository(Student) private readonly studentRepository: Repository<Student>, private userQueryService: UserQueryService) {}
  async create(createStudentPayload: CreateStudentPayload): Promise<Student> {
    const newStudent = await this.studentRepository.save(createStudentPayload);
    const user = await this.userQueryService.findOne({ key: "id", value: createStudentPayload.user.id });
    user.role = UserRole.STUDENT;
    user.student = newStudent;
    await this.userQueryService.update(user.id, user);
    return newStudent;
  }
}
