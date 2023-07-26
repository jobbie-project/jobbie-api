import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthModule } from "src/modules/auth/auth.module";
import { StudentController } from "./controller/student.controller";
import { ValidateIdMiddleware } from "./middleware/validate-id.middleware";
import { StudentQueryService } from "./service/student-query.service";
import { StudentCreationService } from "./service/student-creation.service";
import { StudentHelper } from "./helpers/student.helper";
@Module({
  imports: [AuthModule],
  providers: [StudentQueryService, StudentCreationService, StudentHelper],
  controllers: [StudentController],
})
export class StudentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateIdMiddleware).forRoutes({ path: "student/:id", method: RequestMethod.PUT }, { path: "student/:id", method: RequestMethod.DELETE });
  }
}
