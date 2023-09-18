import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./controllers/user.controller";
import { UserCreationService } from "./services/user-creation.service";
import { UserQueryService } from "./services/user-query.service";
import { UserRepository } from "./repositories/user.repository";
import { Module } from "@nestjs/common";
import { UserMailService } from "./services/mail/user.mail.service";
import { UserHelper } from "./helpers/user.helper";
import { UserValidationService } from "./services/user-validation.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserCreationService, UserQueryService, UserRepository, UserMailService, UserHelper, UserValidationService],
  exports: [UserQueryService, UserCreationService, UserValidationService],
})
export class UserModule {}
