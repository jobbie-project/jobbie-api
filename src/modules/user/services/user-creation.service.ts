import { CreateUserDto } from "@/modules/user/dtos/create-user.dto";
import { UpdateUserDto } from "@/modules/user/dtos/update-user.dto";
import { UserRepository } from "@/modules/user/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { UserQueryService } from "./user-query.service";
import ApiError from "@/common/error";
import { UserMailService } from "./mail/user.mail.service";
import { UserHelper } from "../helpers/user.helper";
import { User } from "../user.entity";

@Injectable()
export class UserCreationService {
  constructor(
    private readonly userRepository: UserRepository,
    private userQueryService: UserQueryService,
    private userMailService: UserMailService,
    private userHelper: UserHelper
  ) {}

  async create(userToCreate: CreateUserDto): Promise<User> {
    const userExists = await this.userQueryService.findOne({
      key: "email",
      value: userToCreate.email,
    });
    if (userExists) throw new ApiError("email-already-in-use", "Este email já está em uso", 400);
    const token = await this.userHelper.generateEmailConfirmationToken(userToCreate.email);
    const hasError = await this.userMailService.sendVerificationEmail(userToCreate.email, userToCreate.name, token);
    if (!hasError) {
      const user = await this.userRepository.create({
        ...userToCreate,
        email_confirmation_token: token,
      });
      return user;
    }
    throw new ApiError("error-sending-email", "Erro ao enviar email de confirmação", 500);
  }

  async update(id: string, userToUpdate: UpdateUserDto) {
    const user = await this.userRepository.findOne({ key: "id", value: id });
    userToUpdate = { ...user, ...userToUpdate };
    return this.userRepository.update(id, userToUpdate);
  }

  async updateUserPassoword(id: string, passwordHash: string) {
    return this.userRepository.updatePassword(id, passwordHash);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}
