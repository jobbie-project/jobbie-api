import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../repositories/student.repository";
import { User } from "@/modules/user/user.entity";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { UserQueryService } from "@/modules/user/service/user-query.service";
import { UserCreationService } from "@/modules/user/service/user-creation.service";
import { CurriculumService } from "@/modules/curriculum/services/curriculum.service";
import { Student } from "../student.entity";
import { CreateCurriculumDto } from "@/modules/curriculum/dto/create-curriculum.dto";

@Injectable()
export class StudentCreationService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private userQueryService: UserQueryService,
    private userCreationService: UserCreationService,
    private curriculumService: CurriculumService
  ) {}
  async create(requestingUser: User, createStudentDto: CreateStudentDto) {
    const { name, phone, fatec_education, ...curriculum } = createStudentDto;
    const newCurriculum = await this.curriculumService.createCurriculum({ ...curriculum, ...fatec_education });
    const newStudent = await this.studentRepository.create({ curriculum: newCurriculum, phone, user: requestingUser });
    const user = await this.userQueryService.findOne({ key: "id", value: requestingUser.id });
    user.student = newStudent;
    await this.userCreationService.update(user.id, { ...user, profile_completed: true, name: createStudentDto.name ?? user.name });
    await this.update(newStudent.id, { curriculum: newCurriculum });
    return newStudent;
  }

  async update(id: string, updateStudentPayload: Partial<Student>) {
    return await this.studentRepository.update(id, updateStudentPayload);
  }
}
