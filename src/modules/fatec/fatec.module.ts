import { Module } from "@nestjs/common";
import { FatecController } from "./controllers/fatec.controller";
import { FatecService } from "./services/fatec.service";
import { FatecInstitution } from "./fatec-institution.entity";
import { FatecCourse } from "./fatec-course.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FatecCourseRepository } from "./repositories/fatec-course.repository";
import { FatecInstitutionRepository } from "./repositories/fatec-insitution.repository";

@Module({
  imports: [TypeOrmModule.forFeature([FatecInstitution, FatecCourse])],
  controllers: [FatecController],
  providers: [FatecService, FatecCourseRepository, FatecInstitutionRepository],
  exports: [FatecService],
})
export class FatecModule {}
