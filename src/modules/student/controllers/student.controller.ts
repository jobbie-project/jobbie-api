import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { StudentCreationService } from "../services/student-creation.service";
import { User } from "@/modules/user/user.entity";
import { Request } from "express";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { UserRole } from "@/modules/user/enums";
import { RoleGuard } from "@/common/guards/role.guard";
import ApiError from "@/common/error";
import { UpdateStudentPayload } from "../interfaces/update-student.payload";

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

  @Patch()
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.STUDENT]))
  async update(@Req() req: Request, @Body() createStudentDto: CreateStudentDto) {
    const user = req.user as User;
    const student = await this.studentCreationService.update(user, { curriculumId: user.student.curriculum_id, ...createStudentDto });
    return { ok: true, student };
  }

  @Get(":studentId")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.ADMIN, UserRole.COMPANY]))
  async getStudentData(@Param("studentId") studentId: string) {
    const student = await this.studentCreationService.getStudentData(studentId);
    return { ok: true, student };
  }
}
