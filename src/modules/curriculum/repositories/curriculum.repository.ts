import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Curriculum } from "../curriculum.entity";
import { CreateCurriculumDto } from "../dtos/create-curriculum.dto";
import { FindOneCurriculumOptions } from "../interfaces/find-one-curriculum-options.interface";

@Injectable()
export class CurriculumRepository {
  constructor(@InjectRepository(Curriculum) private readonly curriculumRepository: Repository<Curriculum>) {}
  async create(createCurriculumPayload: Partial<Curriculum>): Promise<Curriculum> {
    const newCurriculum = await this.curriculumRepository.save(createCurriculumPayload);
    return newCurriculum;
  }

  async findOne(options: FindOneCurriculumOptions): Promise<Curriculum> {
    const qb = this.curriculumRepository.createQueryBuilder("curriculum");
    if (options.relations) {
      options.relations.forEach((relation) => {
        qb.leftJoinAndSelect(`curriculum.${relation}`, relation);
      });
    }
    qb.where(`curriculum.${options.key} = :value`, { value: options.value });
    const curriculum = await qb.getOne();
    return curriculum;
  }

  async update(curriculumId: string, updateCurriculumPayload: Partial<Curriculum>) {
    const updatedCurriculum = await this.curriculumRepository.save({ id: curriculumId, ...updateCurriculumPayload });
    return updatedCurriculum;
  }
}
