import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@/modules/user/user.entity";
import { UserQueryService } from "@/modules/user/service/user-query.service";
import bcrypt from "bcrypt";
import { AuthMailService } from "./mail/auth.mail.service";
import { AuthHelper } from "../helpers/auth.helper";
import ApiError from "@/common/error";
@Injectable()
export class AuthService {
  constructor(private userQueryService: UserQueryService, private jwtService: JwtService, private authMailService: AuthMailService, private authHelper: AuthHelper) {}

  async validateUser(username: string, password: string): Promise<Partial<User>> {
    const user = await this.userQueryService.findOne({
      key: "email",
      value: username,
      withPasswordHash: true,
    });
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile_completed: user.profile_completed,
      };
    }
    return null;
  }

  async getLoginResponse(user: User) {
    const payload = { id: user.id, name: user.name, email: user.email, role: user.role };
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userQueryService.findOne({ key: "email", value: email });
    if (!user) throw new ApiError("user-not-found", "Usuário não encontrado", 404, true);
    const token = await this.authHelper.generateResetPasswordToken(email);
    await this.authMailService.sendResetPasswordEmail(user, token);
  }
}
