import { UserRepository } from "../repositories/user.repositoy";
import bcrypt from "bcrypt";

export class UserHelper {
  constructor(private userRepository: UserRepository) {}

  async validateEmail(email: string) {
    const user = await this.userRepository.findOneByEmail(email);
    if (user) {
      throw new Error("Email already exists");
    }
  }

  generatePasswordHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
}
