import { FindOneUserOptions } from "../interfaces/find-one-user-options.interface";
import { UserRepository } from "../repositories/user.repositoy";

export class UserQueryService {
  constructor(private userRepository: UserRepository) {}

  async findOne(options: FindOneUserOptions) {
    return this.userRepository.findOne(options);
  }
}
