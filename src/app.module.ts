import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { StudentModule } from "./modules/student/student.module";
import { JobModule } from "./modules/job/job.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.MODE === "dev" ? true : false,
      logging: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    StudentModule,
    JobModule,
  ],
})
export class AppModule {}
