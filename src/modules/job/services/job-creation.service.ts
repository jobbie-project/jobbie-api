import { Injectable } from "@nestjs/common";
import { CreateJobDto } from "../dtos/create-job.dto";
import { JobRepository } from "../repositories/job.repository";
import { User } from "@/modules/user/user.entity";
import { UserRole } from "@/modules/user/enums";
import { Job } from "../job.entity";
import { JobHelper } from "../helpers/job.helper";
import ApiError from "@/common/error";

@Injectable()
export class JobCreationService {
  constructor(
    private readonly jobRepository: JobRepository,
    private readonly jobHelper: JobHelper
  ) {}

  async createJob(requestingUser: User, createJobDto: CreateJobDto) {
    const code = await this.jobHelper.generateNewCode();
    const createJobPayload: Partial<Job> = {
      ...createJobDto,
      salary: +createJobDto.salary,
      code,
    };
    requestingUser.role === UserRole.COMPANY
      ? (createJobPayload.owner_company = requestingUser.company)
      : (createJobPayload.owner_admin = requestingUser);
    const job = await this.jobRepository.createJob(createJobPayload);
    return job;
  }

  async updateJob(job: Job, updateJobDto: Partial<Job>) {
    await this.jobRepository.updateJob(job, updateJobDto);
    return this.jobRepository.getJobById(job.id);
  }

  async deleteJob(requestingUser: User, job: Job) {
    if (
      requestingUser.role === UserRole.COMPANY &&
      job.owner_company.id !== requestingUser.company.id
    ) {
      throw new ApiError(
        "Ação não permitida",
        "Você não é dono desta vaga",
        403
      );
    }
    await this.jobRepository.deleteJob(job);
  }
}
