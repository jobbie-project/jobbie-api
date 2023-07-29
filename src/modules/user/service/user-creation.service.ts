import { CreateUserDto } from "@/modules/user/dto/create-user.dto";
import { UpdateUserDto } from "@/modules/user/dto/update-user.dto";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { UserQueryService } from "./user-query.service";
import ApiError from "@/common/error";
import jwt from "jsonwebtoken";
import { UserMailService } from "./mail/user.mail.service";
import { UserHelper } from "../helpers/user.helper";

@Injectable()
export class UserCreationService {
  constructor(
    private readonly userRepository: UserRepository,
    private userQueryService: UserQueryService,
    private userMailService: UserMailService,
    private userHelper: UserHelper
  ) {}

  async create(userToCreate: CreateUserDto) {
    const userExists = await this.userQueryService.findOne({ key: "email", value: userToCreate.email });
    if (userExists) throw new ApiError("email-already-in-use", "Este email já está em uso", 400);
    const token = await this.userHelper.generateEmailConfirmationToken(userToCreate.email);
    const user = await this.userRepository.create({ ...userToCreate, email_confirmation_token: token });
    await this.userMailService.sendVerificationEmail(user, token);
    return { ok: true, user };
  }

  async verifyEmail(token: string) {
    {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        throw new ApiError("invalid-token", "Token inválido", 400, true);
      }
      const user = await this.userQueryService.findOne({ key: "email_confirmation_token", value: token });
      if (!user) throw new ApiError("email-auth-expired-token", "Token não é o mais atual", 404, true);
      user.email_validated = true;
      this.userRepository.validateEmail(user.id);
      return { ok: true, token, email: user.email };
    }
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
