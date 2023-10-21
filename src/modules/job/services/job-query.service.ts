import { Injectable } from "@nestjs/common";
import { JobRepository } from "../repositories/job.repository";
import { JobsListOptions } from "../interfaces/jobs-list-options.interface";
import { JobsListOptionsDto } from "../dtos/list-jobs.dto";

@Injectable()
export class JobQueryService {
  constructor(private readonly jobRepository: JobRepository) {}

  async getAllJobs(query?: JobsListOptionsDto) {
    return await this.jobRepository.getAllJobs(query);
  }

  async getJobById(id: string) {
    return await this.jobRepository.getJobById(id);
  }

  async getJobDataByCode(code: string, withApplicants?: boolean) {
    return await this.jobRepository.getJobDataByCode(code, withApplicants);
  }
}
