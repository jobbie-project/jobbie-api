import ApiError from "@/common/error";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobApplicant } from "../job-applicants.entity";
@Injectable()
export class JobApplicantRepository {
  constructor(@InjectRepository(JobApplicant) private readonly jobApplicantRepository: Repository<JobApplicant>) {}

  async save(jobApplicant: { job_id: string; student_id: string; was_sended?: boolean }) {
    try {
      return await this.jobApplicantRepository.save(jobApplicant);
    } catch (error) {
      console.log(error);
      throw new ApiError("error-on-apply-job", "Erro ao se candidatar na vaga", 500);
    }
  }

  async findJobApplicantByJobIdAndStudentId(jobId: string, studentId: string) {
    return await this.jobApplicantRepository.findOne({ where: { job_id: jobId, student_id: studentId } });
  }

  async loadAllStudentsAppliedByJobId(jobId: string): Promise<JobApplicant[]> {
    const qb = this.jobApplicantRepository.createQueryBuilder("job_applicants");
    qb.leftJoinAndSelect("job_applicants.student", "student");
    qb.leftJoinAndSelect("student.user", "user");
    qb.leftJoinAndSelect("student.curriculum", "curriculum");
    qb.where("job_applicants.job_id = :jobId", { jobId });
    const jobApplicants = await qb.getMany();
    return jobApplicants;
  }

  async setWasSendedOntoStudentWithJobId(jobId: string, studentsId: string[]) {
    const qb = this.jobApplicantRepository.createQueryBuilder("job_applicants");
    qb.where("job_applicants.job_id = :jobId", { jobId });
    qb.andWhere("job_applicants.student_id IN (:...studentsId)", { studentsId });
    qb.update().set({ was_sended: true });
    await qb.execute();

    return { ok: true };
  }
}
