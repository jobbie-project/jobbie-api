import { Module } from "@nestjs/common";
import { JobApplicantsService } from "./services/job-applicants.service";
import { JobApplicantRepository } from "./repositories/job-applicants.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobApplicant } from "./job-applicants.entity";

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([JobApplicant])],
  providers: [JobApplicantRepository, JobApplicantsService],
  exports: [JobApplicantsService],
})
export class JobApplicantsModule {}
