import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthModule } from "src/modules/auth/auth.module";
import { UserController } from "./controller/user.controller";
import { ValidateIdMiddleware } from "./middleware/validate-id.middleware";
import { UserService } from "./service/user.service";
import { UserQueryService } from "./service/user-query.service";
import { UserCreationService } from "./service/user-creation.service";
import { UserHelper } from "./helpers/user.helper";
@Module({
  imports: [AuthModule],
  providers: [UserService, UserQueryService, UserCreationService, UserHelper],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateIdMiddleware).forRoutes({ path: "user/:id", method: RequestMethod.PUT }, { path: "user/:id", method: RequestMethod.DELETE });
  }
}
