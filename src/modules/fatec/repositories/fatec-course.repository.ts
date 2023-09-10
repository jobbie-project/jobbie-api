import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FatecCourse } from "../fatec-course.entity";
import { Repository } from "typeorm";

@Injectable()
export class FatecCourseRepository {
  constructor(@InjectRepository(FatecCourse) private readonly fatecCourse: Repository<FatecCourse>) {}
  async findAll() {
    return await this.fatecCourse.find();
  }
}
