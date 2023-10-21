import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "@/modules/user/dtos/create-user.dto";
import { Request } from "express";
import { UserQueryService } from "@/modules/user/services/user-query.service";
import { UserCreationService } from "@/modules/user/services/user-creation.service";
import { User } from "@/modules/user/user.entity";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RoleGuard } from "@/common/guards/role.guard";
import { UserRole } from "../enums";
import { UpdateUserDto } from "../dtos/update-user.dto";

@Controller("user")
export class UserController {
  constructor(private userQueryService: UserQueryService, private userCreationService: UserCreationService) {}

  @Post("create")
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userCreationService.create(createUserDto);
    return { ok: true, email: user.email };
  }

  @Get()
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.STUDENT]))
  async getProfileData(@Req() req: Request) {
    const user = req.user as User;
    return {
      ok: true,
      user: await this.userQueryService.findOne({ key: "id", value: user.id, withStudentAndCurriculum: true }),
    };
  }

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
