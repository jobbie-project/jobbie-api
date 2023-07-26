import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "@/modules/student/../auth/auth.service";
import { JwtAuthGuard } from "@/modules/student/../auth/jwt-auth.guard";
import { CreateStudentDto } from "@/modules/student/dto/create-student.dto";
import { Request } from "express";
import { UpdateStudentDto } from "@/modules/student/dto/update-student.dto";
import { StudentQueryService } from "@/modules/student/service/student-query.service";
import { StudentCreationService } from "@/modules/student/service/student-creation.service";
import { RoleGuard } from "@/common/guards/role.guard";
import { StudentRole } from "@/modules/student/enums";
import { Student } from "@/modules/student/student.entity";

@Controller("student")
export class StudentController {
  constructor(private studentQueryService: StudentQueryService, private studentCreationService: StudentCreationService, private authService: AuthService) {}
  @Post("auth")
  async authenticate(@Req() req: Request) {
    const student = req.user as Student;
    const asb = (await this.studentQueryService.findOne({ key: "id", value: student.id })) as Student;
    return await asb.verifyPassword(req.body.password);
  }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentCreationService.create(createStudentDto);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard([StudentRole.STUDENT]))
  @Get()
  async getProfileData(@Req() req: Request) {
    const student = req.user as Student;
    return this.studentQueryService.findOne({ key: "id", value: student.id });
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, new RoleGuard([StudentRole.STUDENT]))
  async updateProfileData(@Param("id") id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentCreationService.update(id, updateStudentDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.studentCreationService.delete(id);
  }
}
