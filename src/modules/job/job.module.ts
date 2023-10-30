import { Module } from "@nestjs/common";
import { JobController } from "./controllers/job.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./job.entity";
import { JobCreationService } from "./services/job-creation.service";
import { JobRepository } from "./repositories/job.repository";
import { JobQueryService } from "./services/job-query.service";
import { JobHelper } from "./helpers/job.helper";
import { JobApplicationService } from "./services/job-application.service";
import { JobMailService } from "./services/mail/job-mail.service";
import { JobApplicantsModule } from "../job_applicants/job-applicants.module";
import { FatecModule } from "../fatec/fatec.module";

@Module({
  controllers: [JobController],
  imports: [TypeOrmModule.forFeature([Job]), JobApplicantsModule, FatecModule],
  providers: [JobCreationService, JobQueryService, JobRepository, JobHelper, JobApplicationService, JobMailService],
})
export class JobModule {}
