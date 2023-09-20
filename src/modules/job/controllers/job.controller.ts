import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RoleGuard } from "@/common/guards/role.guard";
import { UserRole } from "@/modules/user/enums";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CreateJobDto } from "../dtos/create-job.dto";

@Controller("job")
export class JobController {
  constructor() {}

  @Post("/post-job")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.COMPANY, UserRole.ADMIN]))
  async postJob(@Req() req: Request, @Body() createJobDto: CreateJobDto) {}
}
