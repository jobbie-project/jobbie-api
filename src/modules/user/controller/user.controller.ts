import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "../../auth/auth.service";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { LocalAuthGuard } from "../../auth/local-auth.guard";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserService } from "../service/user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("auth")
  authenticate(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOneById(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.delete(+id);
  }
}
