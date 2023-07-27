import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "@/modules/user/dto/create-user.dto";
import { Request } from "express";
import { UpdateUserDto } from "@/modules/user/dto/update-user.dto";
import { UserQueryService } from "@/modules/user/service/user-query.service";
import { UserCreationService } from "@/modules/user/service/user-creation.service";
import { RoleGuard } from "@/common/guards/role.guard";
import { UserRole } from "@/modules/user/enums";
import { User } from "@/modules/user/user.entity";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { AuthService } from "@/modules/auth/services/auth.service";

@Controller("user")
export class UserController {
  constructor(private userQueryService: UserQueryService, private userCreationService: UserCreationService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userCreationService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.STUDENT]))
  async getProfileData(@Req() req: Request) {
    const user = req.user as User;
    return this.userQueryService.findOne({ key: "id", value: user.id });
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.STUDENT]))
  async updateProfileData(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userCreationService.update(id, updateUserDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.userCreationService.delete(id);
  }
}
