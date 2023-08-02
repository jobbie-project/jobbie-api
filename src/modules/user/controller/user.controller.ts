import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "@/modules/user/dtos/create-user.dto";
import { Request } from "express";
import { UpdateUserDto } from "@/modules/user/dtos/update-user.dto";
import { UserQueryService } from "@/modules/user/service/user-query.service";
import { UserCreationService } from "@/modules/user/service/user-creation.service";
import { RoleGuard } from "@/common/guards/role.guard";
import { UserRole } from "@/modules/user/enums";
import { User } from "@/modules/user/user.entity";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { VerifyEmailDto } from "../dtos/verify-email.dto";
import { ResendEmailConfirmationDto } from "../dtos/ressend-email-confirmation.dto";
import { UserValidationService } from "../service/user-validation.service";

@Controller("user")
export class UserController {
  constructor(private userQueryService: UserQueryService, private userCreationService: UserCreationService, private userValidationService: UserValidationService) {}

  @Post("create")
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userCreationService.create(createUserDto);
    return { ok: true, email: user.email };
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // async getProfileData(@Req() req: Request) {
  //   const user = req.user as User;
  //   return this.userQueryService.findOne({ key: "id", value: user.id });
  // }

  // @Put()
  // @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.STUDENT]))
  // async updateProfileData(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userCreationService.update(id, updateUserDto);
  // }

  // @Delete(":id")
  // async remove(@Param("id") id: string) {
  //   return this.userCreationService.delete(id);
  // }
}
