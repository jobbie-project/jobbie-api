import { CreateUserDto } from "@/modules/user/dto/create-user.dto";
import { UpdateUserDto } from "@/modules/user/dto/update-user.dto";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { UserQueryService } from "./user-query.service";
import ApiError from "@/common/error";

@Injectable()
export class UserCreationService {
  constructor(private readonly userRepository: UserRepository, private userQueryService: UserQueryService) {}

  async create(userToCreate: CreateUserDto) {
    const userExists = await this.userQueryService.findOne({ key: "email", value: userToCreate.email });
    if (userExists) throw new ApiError("email-already-in-use", "Este email já está em uso", 400);
    return await this.userRepository.create(userToCreate);
  }

  async update(id: string, userToUpdate: UpdateUserDto) {
    const user = await this.userRepository.findOne({ key: "id", value: id });
    userToUpdate = { ...user, ...userToUpdate };
    return this.userRepository.update(id, userToUpdate);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
