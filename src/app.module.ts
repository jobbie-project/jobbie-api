import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import config from "./config";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: false,
      autoLoadEntities: true,
    }),
  ],
  providers: [UserModule],
})
export class AppModule {}
