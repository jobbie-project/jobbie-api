import ApiError from "@/common/error";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RoleGuard } from "@/common/guards/role.guard";
import { UserRole } from "@/modules/user/enums";
import { User } from "@/modules/user/user.entity";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CreateCompanyDto } from "../dtos/create-company.dto";
import { CompanyCreationService } from "../services/company-creation.service";

@Controller("company")
export class CompanyController {
  constructor(private companyCreationService: CompanyCreationService) {}
  @Post("create")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.COMPANY]))
  async create(@Req() req: Request, @Body() createCompanyDto: CreateCompanyDto) {
    const user = req.user as User;
    if (user.company) {
      throw new ApiError("user-already-company", "Usuário já é uma empresa", 400);
    }
    const company = await this.companyCreationService.create(user, createCompanyDto);
    return { ok: true, company };
  }
}
