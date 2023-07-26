import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@/modules/user/user.entity";
import { UserQueryService } from "@/modules/user/service/user-query.service";
@Injectable()
export class AuthService {
  constructor(private userQueryService: UserQueryService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userQueryService.findOne({ key: "email", value: username });
    if (!user) throw new NotFoundException("Conta não encontrada");

    if (!(await user.verifyPassword(password))) throw new UnauthorizedException("Credenciais inválidas");

    delete user.password_hash;

    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
