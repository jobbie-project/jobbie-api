import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user/user.module";
import { Curriculum } from "./curriculum.entity";
import { CurriculumRepository } from "./repositories/curriculum.repository";
import { CurriculumService } from "./services/curriculum.service";

@Module({
  imports: [TypeOrmModule.forFeature([Curriculum]), UserModule],
  providers: [CurriculumService, CurriculumRepository],
  exports: [CurriculumService],
})
export class CurriculumModule {}
