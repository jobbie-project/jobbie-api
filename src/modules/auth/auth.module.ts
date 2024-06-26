import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { AuthController } from "./controllers/auth.controller";
import { UserModule } from "../user/user.module";
import { AuthMailService } from "./services/mail/auth.mail.service";
import { AuthHelper } from "./helpers/auth.helper";

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "1d" },
      }),
    }),
    PassportModule,
  ],
  providers: [AuthService, UserModule, LocalStrategy, JwtStrategy, AuthMailService, AuthHelper],
})
export class AuthModule {}
