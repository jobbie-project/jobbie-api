import { Injectable } from "@nestjs/common";
import { StudentRepository } from "../repositories/student.repository";
import { User } from "@/modules/user/user.entity";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { UserQueryService } from "@/modules/user/services/user-query.service";
import { UserCreationService } from "@/modules/user/services/user-creation.service";
import { CurriculumService } from "@/modules/curriculum/services/curriculum.service";
import { Curriculum } from "@/modules/curriculum/curriculum.entity";
import { UpdateStudentPayload } from "../interfaces/update-student.payload";

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
    const newStudent = await this.studentRepository.create({ curriculum: newCurriculum, phone, user: requestingUser, shift: createStudentDto.shift });
    const user = await this.userQueryService.findOne({ key: "id", value: requestingUser.id });
    user.student = newStudent;
    await this.userCreationService.update(user.id, { ...user, profile_completed: true, name: createStudentDto.name ?? user.name });
    const finalStudent = await this.addCurriculum(newStudent.id, newCurriculum);
    return finalStudent;
  }

  async addCurriculum(id: string, curriculum: Curriculum) {
    return await this.studentRepository.addCurriculum(id, curriculum);
  }

  async update(requestingUser: User, UpdateStudentPayload: UpdateStudentPayload) {
    const { name, phone, fatec_education, ...curriculum } = UpdateStudentPayload;
    await this.userCreationService.update(requestingUser.id, { name });
    await this.curriculumService.update(UpdateStudentPayload.curriculumId, { ...curriculum, ...fatec_education });
    return await this.studentRepository.update(requestingUser.student.id, { phone });
  }
}
