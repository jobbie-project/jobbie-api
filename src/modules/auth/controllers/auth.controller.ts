import { User } from "@/modules/user/user.entity";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../services/auth.service";
import { AuthGuard } from "@nestjs/passport";
import { ResendEmailConfirmationDto } from "@/modules/user/dtos/ressend-email-confirmation.dto";
import { VerifyEmailDto } from "@/modules/user/dtos/verify-email.dto";
import { UserValidationService } from "@/modules/user/service/user-validation.service";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private userValidationService: UserValidationService) {}
  @Post("authenticate")
  @UseGuards(AuthGuard("local"))
  async authenticate(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.getLoginResponse(user);
  }

  @Post("resend-email-confirmation")
  async resendConfirmationEmail(@Body() resendEmailConfirmationDto: ResendEmailConfirmationDto) {
    await this.userValidationService.resendConfirmationEmail(resendEmailConfirmationDto.email);
    return { ok: true, email: resendEmailConfirmationDto.email };
  }

  @Post("verify-jwt")
  @UseGuards(JwtAuthGuard)
  async verifyGuard(@Req() req: Request) {
    return { ok: true, user: req.user };
  }

  @Post("verify-email")
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.userValidationService.verifyEmail(verifyEmailDto.token);
  }

  @Post("forgot-password")
  async forgotPassword(@Body() forgotPasswordDto: { email: string }) {
    await this.authService.forgotPassword(forgotPasswordDto.email);
    return { ok: true };
  }
}
