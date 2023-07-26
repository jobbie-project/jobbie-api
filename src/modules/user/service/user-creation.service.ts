import { CreateUserDto } from "@/modules/user/dto/create-user.dto";
import { UpdateUserDto } from "@/modules/user/dto/update-user.dto";
import { UserHelper } from "@/modules/user/helpers/user.helper";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { User } from "@/modules/user/user.entity";

export class UserCreationService {
  constructor(private userRepository: UserRepository, private userHelper: UserHelper) {}

  async create(userToCreate: CreateUserDto) {
    const newUser = new User();
    newUser.name = userToCreate.name;
    newUser.email = userToCreate.email;
    newUser.password_hash = this.userHelper.generatePasswordHash(userToCreate.password);

    return this.userRepository.create(newUser);
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
