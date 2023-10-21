import { Injectable } from "@nestjs/common";
import { CreateCurriculumDto } from "../dtos/create-curriculum.dto";
import { CurriculumRepository } from "../repositories/curriculum.repository";
import { FatecService } from "@/modules/fatec/services/fatec.service";

@Injectable()
export class CurriculumService {
  constructor(private readonly curriculumRepository: CurriculumRepository, private readonly fatecService: FatecService) {}

  async createCurriculum(createCurriculumDto: CreateCurriculumDto) {
    const fatecCourse = await this.fatecService.getCourseById(createCurriculumDto.fatec_course);
    const fatecInstitution = await this.fatecService.getInstitutionById(createCurriculumDto.fatec_institution);
    const curriculum = await this.curriculumRepository.create({ ...createCurriculumDto, fatec_course: fatecCourse, fatec_institution: fatecInstitution });
    return curriculum;
  }

  async update(id: string, updateCurriculumDto: CreateCurriculumDto) {
    const fatecCourse = await this.fatecService.getCourseById(updateCurriculumDto.fatec_course);
    const fatecInstitution = await this.fatecService.getInstitutionById(updateCurriculumDto.fatec_institution);
    const curriculum = await this.curriculumRepository.update(id, { ...updateCurriculumDto, fatec_course: fatecCourse, fatec_institution: fatecInstitution });
    return curriculum;
  }

  async getCurriculumByStudentId(studentId: string) {
    const curriculum = await this.curriculumRepository.findOne({
      key: "student_id",
      value: studentId,
    });
    return curriculum;
  }
}
