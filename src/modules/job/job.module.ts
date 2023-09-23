import { Module } from "@nestjs/common";
import { JobController } from "./controllers/job.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Job } from "./job.entity";
import { JobCreationService } from "./services/job-creation.service";
import { JobRepository } from "./repositories/job.repository";
import { JobQueryService } from "./services/job-query.service";

@Module({
  controllers: [JobController],
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobCreationService, JobQueryService, JobRepository],
})
export class JobModule {}
