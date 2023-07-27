import { UserQueryService } from "@/modules/user/service/user-query.service";
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

  async validate(payload: any) {
    console.log(payload, "JwtStrategy");
    // const user = this.userQueryService.findOne({ key: "id", value: payload.sub });
    const user = {};
    return user;
  }
}
