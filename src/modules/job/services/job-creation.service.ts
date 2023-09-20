import { Injectable } from "@nestjs/common";
import { CreateJobDto } from "../dtos/create-job.dto";
import { JobRepository } from "../repositories/job.repository";

@Injectable()
export class JobCreationService {
  constructor(private readonly jobRepository: JobRepository) {}

  async createJob(createJobDto: CreateJobDto) {}
}
