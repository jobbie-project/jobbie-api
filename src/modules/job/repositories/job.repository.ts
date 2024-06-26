import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "../job.entity";
import { Repository } from "typeorm";
import { JobsListOptionsDto } from "../dtos/list-jobs.dto";
import { CreateJobPayload } from "../interfaces/create-job.payload";
import ApiError from "@/common/error";
import { JobStatus } from "@/common/enums";

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
    const qb = this.jobRepository.createQueryBuilder("jobs").withDeleted();

    qb.leftJoinAndSelect("jobs.applicants", "applicants");
    qb.leftJoinAndSelect("jobs.fatec_course", "fatec_course");
    qb.addSelect("jobs.created_at");
    options.contract_type &&
      qb.andWhere("jobs.contract_type = ANY(:contract_type)", {
        contract_type: options.contract_type,
      });
    options.job_time &&
      qb.andWhere("jobs.job_time = ANY(:job_time)", {
        job_time: options.job_time,
      });

    options.position &&
      qb.andWhere("jobs.position ILIKE :position", {
        position: `%${options.position}%`,
      });

    options.type &&
      qb.andWhere("jobs.type = ANY(:type)", {
        type: options.type,
      });
    if (options.job_course_id) {
      qb.andWhere("jobs.fatec_course_id = :fatec_course_id", { fatec_course_id: options.job_course_id });
    }

    options.code &&
      qb.andWhere("jobs.code ILIKE :code", {
        code: `%${options.code}%`,
      });

    if (options.owner_admin_id) {
      qb.andWhere("jobs.owner_admin_id = :owner_admin_id", { owner_admin_id: options.owner_admin_id });
    } else {
      qb.andWhere("jobs.status = :status", { status: JobStatus.OPEN });
    }

    qb.orderBy("jobs.created_at", options.order_by ?? "DESC");

    const jobs = await qb.getManyAndCount();

    return { jobs: jobs[0], total: jobs[1] };
  }

  async getJobById(id: string) {
    return await this.jobRepository.findOne({ where: { id } });
  }

  async getJobDataByCode(code: string, withApplicants?: boolean, options?: { page?: string; student_name?: string }) {
    try {
      const qb = this.jobRepository.createQueryBuilder("jobs");
      qb.where("jobs.code = :code", { code });
      if (withApplicants) {
        qb.leftJoinAndSelect("jobs.fatec_course", "job_fatec_course");
        qb.leftJoinAndSelect("jobs.applicants", "applicants");
        qb.leftJoinAndSelect("applicants.student", "student");
        qb.leftJoinAndSelect("student.curriculum", "curriculum");
        qb.leftJoinAndSelect("curriculum.fatec_course", "fatec_course");
        qb.leftJoinAndSelect("student.user", "user");
      }

      options?.student_name &&
        qb.andWhere("user.name ILIKE :student_name", {
          student_name: `%${options.student_name}%`,
        });

      const job = await qb.getOne();
      return { job, totalApplicants: job?.applicants?.length };
    } catch (error) {
      console.log(error);
      throw new ApiError("error-getting-job", "Erro ao buscar vaga", 500);
    }
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
    await this.jobRepository.update(job.id, { status: JobStatus.CLOSED });
    await this.jobRepository.softDelete({ id: job.id });
  }
}
