import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { LocalAuthGuard } from "../../auth/local-auth.guard";
import { CreateUserDto } from "../dto/create-user.dto";
import { Request } from "express";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserQueryService } from "../service/user-query.service";
import { UserCreationService } from "../service/user-creation.service";
import { RoleGuard } from "@/common/guards/role.guard";
import { UserRole } from "../../student/enums";
import { User } from "../user.model";

@Controller("user")
export class UserController {
  constructor(private userQueryService: UserQueryService, private userCreationService: UserCreationService, private authService: AuthService) {}
  @Post("auth")
  async authenticate(@Req() req: Request) {
    const user = req.user as User;
    const asb = (await this.userQueryService.findOne({ key: "id", value: user.id })) as User;
    return await asb.verifyPassword(req.body.password);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userCreationService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.STUDENT]))
  @Get()
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
