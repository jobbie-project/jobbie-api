import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "../job.entity";
import { Repository } from "typeorm";
import { JobsListOptionsDto } from "../dtos/list-jobs.dto";
import { CreateJobPayload } from "../interfaces/create-job.payload";
import ApiError from "@/common/error";

@Injectable()
export class JobRepository {
  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>) {}

  async save(job: Job) {
    try {
      return await this.jobRepository.save(job);
    } catch (error) {
      console.log(error);
      throw new ApiError("error-saving-job", "Erro ao salvar vaga", 500);
    }
  }

  async createJob(createJobDto: CreateJobPayload) {
    try {
      const job = await this.jobRepository.save(createJobDto);
      return job;
    } catch (error) {
      console.log(error);
      throw new ApiError("error-saving-job", "Erro ao salvar vaga", 500);
    }
  }

  async getAllJobs(options?: JobsListOptionsDto) {
    const { page = 1, per_page = 10 } = options;
    const qb = this.jobRepository.createQueryBuilder("jobs");

    qb.leftJoinAndSelect("jobs.applicants", "applicants");
    options.contract_type &&
      qb.andWhere("jobs.contract_type = :contract_type", {
        contract_type: options.contract_type,
      });
    options.job_time && qb.andWhere("jobs.job_time = :job_time", { job_time: options.job_time });
    options.position &&
      qb.andWhere("jobs.position ILIKE :position", {
        position: `%${options.position}%`,
      });
    options.type && qb.andWhere("jobs.type = :type", { type: options.type });

    qb.skip((page - 1) * per_page);

    qb.take(per_page);

    qb.orderBy("jobs.created_at", options.order_by ?? "DESC");

    const jobs = await qb.getManyAndCount();

    return { jobs: jobs[0], total: jobs[1] };
  }

  async getJobById(id: string) {
    return await this.jobRepository.findOne({ where: { id } });
  }

  async getJobDataByCode(code: string, withApplicants?: boolean) {
    const qb = this.jobRepository.createQueryBuilder("jobs");
    qb.where("jobs.code = :code", { code });
    if (withApplicants) {
      qb.leftJoinAndSelect("jobs.applicants", "applicants");
    }
    const job = await qb.getOne();
    return { job, totalApplicants: job?.applicants?.length };
  }

  async updateJob(job: Job, updateJobDto: Partial<Job>) {
    try {
      await this.jobRepository.update(job.id, updateJobDto);
      return this.getJobById(job.id);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteJob(job: Job) {
    await this.jobRepository.remove(job);
  }
}
