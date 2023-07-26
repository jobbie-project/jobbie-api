import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { StudentService } from "../student/service/student.service";
import Student from "../student/student.model";
@Injectable()
export class AuthService {
  constructor(private userService: StudentService, private jwtService: JwtService) {}

  async validateStudent(username: string, password: string) {
    const student = await this.userService.findOneByEmail(username);
    if (!student) throw new NotFoundException("Conta não encontrada");

    if (!(await student.verifyPassword(password))) throw new UnauthorizedException("Credenciais inválidas");

    delete student.password_hash;

    return student;
  }

  async login(student: Student) {
    const payload = { sub: student.id, email: student.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
