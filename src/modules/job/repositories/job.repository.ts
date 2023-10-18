import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "../job.entity";
import { Repository } from "typeorm";
import { JobsListOptionsDto } from "../dtos/list-jobs.dto";

@Injectable()
export class JobRepository {
  constructor(@InjectRepository(Job) private readonly jobRepository: Repository<Job>) {}

  async createJob(createJobDto: Partial<Job>) {
    const job = await this.jobRepository.save(createJobDto);
    await this.jobRepository.save(job);
    return job;
  }

  async getAllJobs(options?: JobsListOptionsDto) {
    const { page = 1, per_page = 10 } = options;
    const qb = this.jobRepository.createQueryBuilder("jobs");

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

  async getJobByCode(code: string): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: { code },
    });

    return job;
  }

  async updateJob(job: Job, updateJobDto: Partial<Job>) {
    try {
      const data = await this.jobRepository.update(job.id, updateJobDto);
      return this.getJobById(job.id);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteJob(job: Job) {
    await this.jobRepository.remove(job);
  }
}
