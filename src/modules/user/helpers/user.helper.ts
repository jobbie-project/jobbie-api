import ApiError from "@/common/error";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import jwt from "jsonwebtoken";
import { User } from "@/modules/user/user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserHelper {
  constructor(private userRepository: UserRepository) {}

  async validateEmail(email: string) {
    const user = await this.userRepository.findOne({ key: "email", value: email });
    if (user) {
      throw new Error("Email already exists");
    }
  }

  async generateEmailConfirmationToken(userEmail: string) {
    const token = jwt.sign({ email: userEmail }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  }

  async confirmEmail(token: string, userToConfirm: User) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new ApiError("invalid-token", "Token inválido", 400, true);
    }
    const user = await this.userRepository.findOne({ key: "id", value: userToConfirm.id });
    if (!user) throw new ApiError("email-auth-expired-token", "Token não é o mais atual", 404, true);
    user.email_validated = true;
    await this.userRepository.update(user.id, user);
    return { token, email: user.email };
  }
}
