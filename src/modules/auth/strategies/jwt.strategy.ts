import { UserQueryService } from "@/modules/user/service/user-query.service";
import { User } from "@/modules/user/user.entity";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userQueryService: UserQueryService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: User) {
    const user = this.userQueryService.findOne({ key: "id", value: payload.id });
    return user;
  }
}
