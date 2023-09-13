import { Injectable } from "@nestjs/common";
import { CreateCurriculumDto } from "../dto/create-curriculum.dto";
import { CurriculumRepository } from "../repositories/curriculum.repository";

@Injectable()
export class CurriculumService {
  constructor(private readonly curriculumRepository: CurriculumRepository) {}

  async createCurriculum(createCurriculumDto: CreateCurriculumDto) {
    return await this.curriculumRepository.create(createCurriculumDto);
  }
}
