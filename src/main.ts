import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ApiErrorFilter } from "./common/error/filter";
import { AppValidationPipe } from "./common/pipes/app-validation.pipe";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new AppValidationPipe());
  app.useGlobalFilters(new ApiErrorFilter());

  await app.listen(1337);
}
bootstrap();
