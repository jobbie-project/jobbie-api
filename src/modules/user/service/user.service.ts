import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "../dto/update-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserHelper } from "../helpers/user.helper";
import { UserCreationService } from "./user-creation.service";
import { UserQueryService } from "./user-query.service";
@Injectable()
export class UserService {
  constructor(private userCreationService: UserCreationService, private userQueryService: UserQueryService, private userHelper: UserHelper) {}

  async create(userToCreate: CreateUserDto) {
    await this.userHelper.validateEmail(userToCreate.email);
    return this.userCreationService.create(userToCreate);
  }

  async findOneById(id: number) {
    return this.userQueryService.findOneById(id);
  }

  async findOneByEmail(email: string) {
    return this.userQueryService.findOneByEmail(email);
  }

  async update(id: number, userToUpdate: UpdateUserDto) {
    return this.userCreationService.update(id, userToUpdate);
  }

  async delete(id: number) {
    return this.userCreationService.delete(id);
  }
}
