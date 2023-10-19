import { Module } from "@nestjs/common";
import { JobController } from "./controllers/job.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./job.entity";
import { JobCreationService } from "./services/job-creation.service";
import { JobRepository } from "./repositories/job.repository";
import { JobQueryService } from "./services/job-query.service";
import { JobHelper } from "./helpers/job.helper";
import { JobApplicationService } from "./services/job-application.service";

@Module({
  controllers: [JobController],
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobCreationService, JobQueryService, JobRepository, JobHelper, JobApplicationService],
})
export class JobModule {}
