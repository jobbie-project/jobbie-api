import { Injectable } from "@nestjs/common";
import { CreateCurriculumDto } from "../dto/create-curriculum.dto";
import { CurriculumRepository } from "../repositories/curriculum.repository";
import { FatecService } from "@/modules/fatec/service/fatec.service";

@Injectable()
export class CurriculumService {
  constructor(private readonly curriculumRepository: CurriculumRepository, private readonly fatecService: FatecService) {}

  async createCurriculum(createCurriculumDto: CreateCurriculumDto) {
    const fatecCourse = await this.fatecService.getCourseById(createCurriculumDto.fatec_course);
    const fatecInstitution = await this.fatecService.getInstitutionById(createCurriculumDto.fatec_institution);
    const curriculum = await this.curriculumRepository.create({ ...createCurriculumDto, fatec_course: fatecCourse, fatec_institution: fatecInstitution });
    return curriculum;
  }
}
