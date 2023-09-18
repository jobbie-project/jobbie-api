import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@/modules/user/user.entity";
import { UserQueryService } from "@/modules/user/services/user-query.service";
import bcrypt from "bcrypt";
import { AuthMailService } from "./mail/auth.mail.service";
import { AuthHelper } from "../helpers/auth.helper";
import ApiError from "@/common/error";
import { UserCreationService } from "@/modules/user/services/user-creation.service";
import { ResetPasswordDto } from "../dtos/reset-password.dto";
@Injectable()
export class AuthService {
  constructor(
    private userQueryService: UserQueryService,
    private jwtService: JwtService,
    private authMailService: AuthMailService,
    private authHelper: AuthHelper,
    private userCreationService: UserCreationService
  ) {}

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
        email_validated: user.email_validated,
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

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const isTokenValid = await this.jwtService.verify(resetPasswordDto.token);
    if (!isTokenValid) throw new ApiError("invalid-token", "Token associado ao link é inválido", 400, true);
    if (!(resetPasswordDto.password === resetPasswordDto.confim_password)) throw new ApiError("passwords-not-match", "As senhas não conferem", 400, true);
    const { email } = this.jwtService.decode(resetPasswordDto.token) as { email: string };
    const user = await this.userQueryService.findOne({ key: "email", value: email });
    if (!user) throw new ApiError("user-not-found", "Usuário não encontrado", 404, true);
    const password_hash = await bcrypt.hash(resetPasswordDto.password, bcrypt.genSaltSync(10));
    await this.userCreationService.updateUserPassoword(user.id, password_hash);
  }
}
