import { Module } from "@nestjs/common";
import { StudentController } from "./controller/student.controller";
import { StudentCreationService } from "./service/student-creation.service";
import { StudentRepository } from "./repositories/student.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./student.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentCreationService, StudentRepository],
})
export class StudentModule {}
