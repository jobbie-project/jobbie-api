import { Injectable } from "@nestjs/common";
import { CreateJobDto } from "../dtos/create-job.dto";
import { JobRepository } from "../repositories/job.repository";
import { User } from "@/modules/user/user.entity";
import { UserRole } from "@/modules/user/enums";
import { Job } from "../job.entity";
import { JobHelper } from "../helpers/job.helper";
import ApiError from "@/common/error";
import { CreateJobPayload } from "../interfaces/create-job.payload";
import { FatecService } from "@/modules/fatec/services/fatec.service";

@Injectable()
export class JobCreationService {
  constructor(private readonly jobRepository: JobRepository, private readonly jobHelper: JobHelper, private readonly fatecService: FatecService) {}

  async saveJob(job: Job) {
    return await this.jobRepository.save(job);
  }

  async createJob(requestingUser: User, createJobDto: CreateJobDto) {
    try {
      const code = await this.jobHelper.generateNewCode();
      const fatecCourse = await this.fatecService.getCourseById(createJobDto.job_tag);
      const createJobPayload: CreateJobPayload = {
        ...createJobDto,
        salary: +createJobDto.salary,
        fatec_course: fatecCourse,
        code,
      };
      requestingUser.role === UserRole.COMPANY ? (createJobPayload.owner_company = requestingUser.company) : (createJobPayload.owner_admin = requestingUser);
      const job = await this.jobRepository.createJob(createJobPayload);
      return job;
    } catch (error) {
      console.log(error);
      throw new ApiError("error-saving-job", "Erro ao salvar vaga", 500);
    }
  }

  async updateJob(job: Job, updateJobDto: Partial<Job>) {
    const data = await this.jobRepository.updateJob(job, updateJobDto);
    return data;
  }

  async deleteJob(requestingUser: User, job: Job) {
    if (requestingUser.role === UserRole.COMPANY && job.owner_company.id !== requestingUser.company.id) {
      throw new ApiError("Ação não permitida", "Você não é dono desta vaga", 403);
    }
    await this.jobRepository.deleteJob(job);
  }
}
