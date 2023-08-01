import ApiError from "@/common/error";
import { UserRole } from "@/modules/user/enums";
import { User } from "@/modules/user/user.entity";
import { CanActivate, Inject, Injectable, ExecutionContext } from "@nestjs/common";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(@Inject("roles") private readonly roles: UserRole[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      // If there is no user here, it means that OptionalJwtAuthGuard is being used.
      return true;
    }
    const user = request.user as User;
    if (!user.email_validated) throw new ApiError("email-not-validated", "Você precisa validar seu email para acessar este recurso", 403);
    if (!this.roles.includes(user.role)) {
      throw new ApiError("forbidden", "Você não tem permissão para acessar este recurso (grupo de permissão inválido)", 403);
    }
    return true;
  }
}
