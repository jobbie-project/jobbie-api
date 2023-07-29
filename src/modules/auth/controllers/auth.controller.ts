import { User } from "@/modules/user/user.entity";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "@/common/guards/local-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { ResendEmailConfirmationDto } from "@/modules/user/dto/ressend-email-confirmation.dto";
import { VerifyEmailDto } from "@/modules/user/dto/verify-email.dto";
import { UserValidationService } from "@/modules/user/service/user-validation.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private userValidationService: UserValidationService) {}
  @Post("authenticate")
  @UseGuards(AuthGuard("local")) // The guard handles the login logic
  async authenticate(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.getLoginResponse(user);
  }

  @Post("resend-email-confirmation")
  async resendConfirmationEmail(@Body() resendEmailConfirmationDto: ResendEmailConfirmationDto) {
    await this.userValidationService.resendConfirmationEmail(resendEmailConfirmationDto.email);
    return { ok: true, email: resendEmailConfirmationDto.email };
  }

  @Post("verify-email")
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.userValidationService.verifyEmail(verifyEmailDto.token);
  }
}
