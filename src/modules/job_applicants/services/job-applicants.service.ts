import { Injectable } from "@nestjs/common";
import { JobApplicantRepository } from "../repositories/job-applicants.repository";
import { Job } from "@/modules/job/job.entity";
import { Student } from "@/modules/student/student.entity";
import { User } from "@/modules/user/user.entity";

@Injectable()
export class JobApplicantsService {
  constructor(private readonly jobApplicantRepository: JobApplicantRepository) {}

  async applyJob(student: Student, job: Job, was_sended = false) {
    const alreadyApplied = await this.jobApplicantRepository.findJobApplicantByJobIdAndStudentId(job.id, student.id);
    if (alreadyApplied) {
      return alreadyApplied;
    }
    return await this.jobApplicantRepository.save({
      job_id: job.id,
      student_id: student.id,
      was_sended,
    });
  }

  async sendAllStudentsToJob(job: Job, studentsId: string[], email: string) {
    const jobApplicants = await this.jobApplicantRepository.loadAllStudentsAppliedByJobId(job.id);
    // TODO: Aqui entra a função para gerar os curriculos e enviar por email para a empresa
    await this.jobApplicantRepository.setWasSendedOntoStudentWithJobId(job.id, studentsId);
  }

  async getStudentAppliedJobs(requestingUser: User) {
    return await this.jobApplicantRepository.getStudentAppliedJobs(requestingUser.student.id);
  }
}
