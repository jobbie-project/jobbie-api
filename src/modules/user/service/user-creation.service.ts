import { CreateUserDto } from "@/modules/user/dto/create-user.dto";
import { UpdateUserDto } from "@/modules/user/dto/update-user.dto";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserCreationService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(userToCreate: CreateUserDto) {
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
