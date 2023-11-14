import { Injectable } from "@nestjs/common";
import { JobRepository } from "../repositories/job.repository";
import { Job } from "../job.entity";
import { User } from "@/modules/user/user.entity";
import { JobCreationService } from "./job-creation.service";
import { JobMailService } from "./mail/job-mail.service";
import { JobApplicantRepository } from "@/modules/job_applicants/repositories/job-applicants.repository";
import ApiError from "@/common/error";
import { JobApplicantsService } from "@/modules/job_applicants/services/job-applicants.service";

@Injectable()
export class JobApplyService {
  constructor(
    private readonly jobCreationService: JobCreationService,
    private readonly jobMailService: JobMailService,
    private readonly jobApplicantsService: JobApplicantsService
  ) {}

  async applyJob(requestingUser: User, job: Job) {
    if (job.fatec_course_id !== requestingUser.student.curriculum.fatec_course.id) {
      throw new ApiError("job-course-does-not-match", "Vaga não pertence ao curso do aluno", 500);
    }
    let was_sended = false;
    if (!job.has_sorting) {
      await this.jobMailService.sendJobApplicationToOwnerEmail(job, requestingUser);
      was_sended = true;
    }
    return await this.jobApplicantsService.applyJob(requestingUser.student, job, was_sended);
  }

  async sendSortedStudents(job: Job, payload: { studentIds: string[]; email: string }) {
    const allStudentsAppliedId = job.applicants.map((applicant) => `${applicant.student_id}`);
    payload.studentIds.forEach((studentId) => {
      if (!allStudentsAppliedId.includes(studentId)) {
        throw new ApiError("student-did-not-applied", "Aluno não aplicou para esta vaga", 500);
      }
    });
    await this.jobApplicantsService.sendAllStudentsToJob(job, payload.studentIds, payload.email);
    return payload.studentIds;
  }
}
