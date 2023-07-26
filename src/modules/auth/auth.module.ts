import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { UserServiceModule } from "src/modules/user/service/user.service.module";
import { JwtStrategy } from "./jwt.strategy";
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "1d" },
      }),
    }),
    PassportModule,
    UserServiceModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
