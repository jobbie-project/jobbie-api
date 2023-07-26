import ApiError from "@/common/error";
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err: any, student: any, info: any) {
    if (info?.message === "jwt expired") throw new ApiError("token-expired", "Token expirado", 401);
    if (info?.message === "No auth token") {
      throw new ApiError("missing-token", "Você precisa se autenticar para utilizar este recurso", 401);
    }
    if (err || !student) {
      throw err || new ApiError("unauthorized", "Não autorizado (jwt inválido)", 401);
    }
    return student;
  }
}
