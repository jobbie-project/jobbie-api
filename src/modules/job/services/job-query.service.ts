import { Injectable } from "@nestjs/common";
import { JobRepository } from "../repositories/job.repository";
import { JobsListOptionsDto } from "../dtos/list-jobs.dto";
import { UserQueryService } from "@/modules/user/services/user-query.service";
import { User } from "@/modules/user/user.entity";
import { UserRole } from "@/modules/user/enums";

@Injectable()
export class JobQueryService {
  constructor(private readonly jobRepository: JobRepository, private readonly userQueryService: UserQueryService) {}

  async getAllJobs(requestingUser: User, query?: JobsListOptionsDto) {
    if (requestingUser.role === UserRole.STUDENT) {
      const user = await this.userQueryService.findOne({
        key: "id",
        value: requestingUser.id,
        withStudentAndCurriculum: true,
      });
      query.job_course_id = user.student.curriculum.fatec_course.id;
    } else if (requestingUser.role === UserRole.ADMIN) {
      query.owner_admin_id = requestingUser.id;
    }
    return await this.jobRepository.getAllJobs(query);
  }

  async getJobById(id: string) {
    return await this.jobRepository.getJobById(id);
  }

  async getJobDataByCode(code: string, withApplicants?: boolean) {
    return await this.jobRepository.getJobDataByCode(code, withApplicants);
  }
}
