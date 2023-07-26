import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserHelper } from "../helpers/user.helper";
import { UserRepository } from "../repositories/user.repositoy";
import { User } from "@/modules/user/user.model";

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
