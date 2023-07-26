import ApiError from "@/common/error";
import { StudentRole } from "@/modules/student/enums";
import { CanActivate, Inject, Injectable, ExecutionContext } from "@nestjs/common";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(@Inject("roles") private readonly roles: StudentRole[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!request.student) {
      // If there is no student here, it means that OptionalJwtAuthGuard is being used.
      return true;
    }
    const student = request.student;
    if (!this.roles.includes(student.role)) {
      throw new ApiError("forbidden", "Você não tem permissão para acessar este recurso (grupo de permissão inválido)", 403);
    }
    return true;
  }
}
