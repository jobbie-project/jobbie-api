import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { StudentCreationService } from "../services/student-creation.service";
import { User } from "@/modules/user/user.entity";
import { Request } from "express";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { UserRole } from "@/modules/user/enums";
import { RoleGuard } from "@/common/guards/role.guard";
import ApiError from "@/common/error";

@Controller("student")
export class StudentController {
  constructor(private studentCreationService: StudentCreationService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.STUDENT]))
  async create(@Req() req: Request, @Body() createStudentDto: CreateStudentDto) {
    const user = req.user as User;
    if (user.student) {
      throw new ApiError("user-already-student", "Usuário já é um estudante", 400);
    }
    const student = await this.studentCreationService.create(user, createStudentDto);
    return { ok: true, student };
  }
}
