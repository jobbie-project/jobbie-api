import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "../job.entity";
import { Repository } from "typeorm";

@Injectable()
export class JobRepository {
  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>) {}

  async create() {}
}
