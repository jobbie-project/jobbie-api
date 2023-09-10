import { Injectable } from "@nestjs/common";
import { FatecInstitutionRepository } from "../repositories/fatec-insitution.repository";
import { FatecCourseRepository } from "../repositories/fatec-course.repository";

@Injectable()
export class FatecService {
  constructor(private readonly fatecInstitutionRepository: FatecInstitutionRepository, private readonly fatecCourseRepository: FatecCourseRepository) {}
  async getCourses() {
    return await this.fatecCourseRepository.findAll();
  }
  async getInstitutions() {
    return await this.fatecInstitutionRepository.findAll();
  }
}
