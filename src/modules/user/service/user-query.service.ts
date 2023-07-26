import { UserRepository } from "../repositories/user.repositoy";

export class UserQueryService {
  constructor(private userRepository: UserRepository) {}

  async findOneById(id: number) {
    return this.userRepository.findOneById(id);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }
}
