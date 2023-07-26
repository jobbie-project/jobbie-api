import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { StudentService } from "src/modules/student/service/student.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: StudentService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const student = this.userService.findOneById(payload.sub);
    return student;
  }
}
