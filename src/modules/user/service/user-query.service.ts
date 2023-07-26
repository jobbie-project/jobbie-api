import { FindOneUserOptions } from "@/modules/user/interfaces/find-one-user-options.interface";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { User } from "@/modules/user/user.entity";

export class UserQueryService {
  constructor(private userRepository: UserRepository) {}

  async findOne(options: FindOneUserOptions): Promise<User> {
    return this.userRepository.findOne(options);
  }
}
