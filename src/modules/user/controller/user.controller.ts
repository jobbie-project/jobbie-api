import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { LocalAuthGuard } from "../../auth/local-auth.guard";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserQueryService } from "../service/user-query.service";
import { UserCreationService } from "../service/user-creation.service";
import { RoleGuard } from "@/common/guards/role.guard";
import { UserRole } from "../enums";

@Controller("user")
export class UserController {
  constructor(private userQueryService: UserQueryService, private userCreationService: UserCreationService, private authService: AuthService) {}
  @Post("auth")
  authenticate(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userCreationService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, new RoleGuard([UserRole.STUDENT]))
  @Get(":id")
  async getProfileData(@Param("id") id: string) {
    return this.userQueryService.findOne({ key: "id", value: id });
  }

  @Put(":id")
  async updateProfileData(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userCreationService.update(id, updateUserDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.userCreationService.delete(id);
  }
}
