import { Injectable } from "@nestjs/common";
import { CreateJobDto } from "../dtos/create-job.dto";
import { JobRepository } from "../repositories/job.repository";
import { User } from "@/modules/user/user.entity";
import { UserRole } from "@/modules/user/enums";
import { Job } from "../job.entity";

@Injectable()
export class JobCreationService {
  constructor(private readonly jobRepository: JobRepository) {}

  async createJob(requestingUser: User, createJobDto: CreateJobDto) {
    const createJobPayload: Partial<Job> = { ...createJobDto, salary: +createJobDto.salary };
    requestingUser.role === UserRole.COMPANY ? (createJobPayload.owner_company = requestingUser.company) : (createJobPayload.owner_admin = requestingUser);
    console.log(createJobPayload);
    const job = await this.jobRepository.createJob(createJobPayload);
    return job;
  }
}
