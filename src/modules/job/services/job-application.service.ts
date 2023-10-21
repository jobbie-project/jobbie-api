import { Injectable } from "@nestjs/common";
import { JobRepository } from "../repositories/job.repository";
import { Job } from "../job.entity";
import { User } from "@/modules/user/user.entity";
import { JobCreationService } from "./job-creation.service";

@Injectable()
export class JobApplicationService {
  constructor(private readonly jobCreationService: JobCreationService) {}

  async applyJob(requestingUser: User, job: Job) {
    const initialApplicants = [...(job.applicants ?? [])];
    initialApplicants.push(requestingUser.student);
    return await this.jobCreationService.saveJob({ ...job, applicants: initialApplicants });
  }
}
