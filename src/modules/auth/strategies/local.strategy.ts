import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import ApiError from "@/common/error";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new ApiError("invalid-credentials", "Credenciais inválidas", 401);
    }
    if (!user.email_validated) throw new ApiError("unauthorized", "Email não validado, confira sua caixa de entrada e de spam", 401);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profile_completed: user.profile_completed,
    };
  }
}
