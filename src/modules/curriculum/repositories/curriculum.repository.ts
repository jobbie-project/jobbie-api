import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Curriculum } from "../curriculum.entity";
import { CreateCurriculumDto } from "../dtos/create-curriculum.dto";

@Injectable()
export class CurriculumRepository {
  constructor(@InjectRepository(Curriculum) private readonly curriculumRepository: Repository<Curriculum>) {}
  async create(createCurriculumPayload: Partial<Curriculum>): Promise<Curriculum> {
    const newCurriculum = await this.curriculumRepository.save(createCurriculumPayload);
    return newCurriculum;
  }
}
