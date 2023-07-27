import { User } from "@/modules/user/user.entity";
import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "@/common/guards/local-auth.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("authenticate")
  @UseGuards(AuthGuard("local")) // The guard handles the login logic
  async authenticate(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.getLoginResponse(user);
  }
}
