import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../repositories/student.repository";
import { User } from "@/modules/user/user.entity";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { UserQueryService } from "@/modules/user/service/user-query.service";
import { UserCreationService } from "@/modules/user/service/user-creation.service";

@Injectable()
export class StudentCreationService {
  constructor(private readonly studentRepository: StudentRepository, private userQueryService: UserQueryService, private userCreationService: UserCreationService) {}
  async create(requestingUser: User, createStudentDto: CreateStudentDto) {
    const newStudent = await this.studentRepository.create({ ...createStudentDto, user: requestingUser });
    const user = await this.userQueryService.findOne({ key: "id", value: requestingUser.id });
    user.student = newStudent;
    await this.userCreationService.update(user.id, { ...user, profile_completed: true });
    return newStudent;
  }
}
