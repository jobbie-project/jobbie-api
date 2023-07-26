import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/service/user.service';
import User from '../user/user.model';
@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByEmail(username);
    if (!user) throw new NotFoundException('Conta não encontrada');

    if (!(await user.verifyPassword(password))) throw new UnauthorizedException('Credenciais inválidas');

    delete user.password_hash;

    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
