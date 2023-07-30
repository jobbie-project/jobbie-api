import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Student } from "../student.entity";
import { CreateStudentPayload } from "../interfaces/create-student.payload";
import { UserQueryService } from "@/modules/user/service/user-query.service";
import { UserCreationService } from "@/modules/user/service/user-creation.service";

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(Student) private readonly studentRepository: Repository<Student>,
    private userQueryService: UserQueryService,
    private userCreationService: UserCreationService
  ) {}
  async create(createStudentPayload: CreateStudentPayload): Promise<Student> {
    const newStudent = await this.studentRepository.save(createStudentPayload);
    const user = await this.userQueryService.findOne({ key: "id", value: createStudentPayload.user.id });
    user.student = newStudent;
    await this.userCreationService.update(user.id, user);
    return newStudent;
  }
}
