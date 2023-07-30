import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { StudentCreationService } from "../service/student-creation.service";
import { User } from "@/modules/user/user.entity";
import { Request } from "express";
import { CreateStudentDto } from "../dtos/create-student.dto";

@Controller("student")
export class StudentController {
  constructor(private studentCreationService: StudentCreationService) {}
  @Post("create")
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: Request, @Body() createStudentDto: CreateStudentDto) {
    const user = req.user as User;
    return await this.studentCreationService.create(user, createStudentDto);
  }
}
