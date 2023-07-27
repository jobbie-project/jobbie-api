import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@/modules/user/user.entity";
import { UserQueryService } from "@/modules/user/service/user-query.service";
import bcrypt from "bcrypt";
@Injectable()
export class AuthService {
  constructor(private userQueryService: UserQueryService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<Partial<User>> {
    const user = await this.userQueryService.findOne({
      key: "email",
      value: username,
    });
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }
    return null;
  }

  async getLoginResponse(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      access_token: this.jwtService.sign(payload),
    };
  }
}
