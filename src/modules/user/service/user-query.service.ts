import { FindOneUserOptions } from "@/modules/user/interfaces/find-one-user-options.interface";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { User } from "@/modules/user/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserQueryService {
  constructor(private userRepository: UserRepository) {}

  async findOne(options: FindOneUserOptions): Promise<User> {
    return await this.userRepository.findOne(options);
  }
}
