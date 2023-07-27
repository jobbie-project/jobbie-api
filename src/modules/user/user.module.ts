import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./controller/user.controller";
import { UserCreationService } from "./service/user-creation.service";
import { UserQueryService } from "./service/user-query.service";
import { UserRepository } from "./repositories/user.repository";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserCreationService, UserQueryService, UserRepository],
  exports: [UserQueryService, UserCreationService],
})
export class UserModule {}
