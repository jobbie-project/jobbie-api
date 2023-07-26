import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Student } from "@/modules/student/student.entity";
import { StudentQueryService } from "@/modules/student/service/student-query.service";
@Injectable()
export class AuthService {
  constructor(private studentQueryService: StudentQueryService, private jwtService: JwtService) {}

  async validateStudent(username: string, password: string) {
    const student = await this.studentQueryService.findOne({ key: "email", value: username });
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
